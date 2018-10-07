const Group = require('../models/Group');
const uniq = require('lodash.uniq');
const difference = require('lodash.difference');

const groupPopulate = (group, res) =>
  Group.populate(group, [
    { path: 'managers', select: 'firstName lastName email phoneNumber' },
    { path: 'creator', select: 'firstName lastName email phoneNumber' },
    { path: 'crew', select: 'firstName lastName email phoneNumber' },
    { path: 'members', select: 'firstName lastName email phoneNumber' },
    { path: 'managers', select: 'firstName lastName email phoneNumber' }
  ]).then((group) => res.json(group));

function validateUserIsAdmin(model, id) {
  const isAManager = model.managers.filter((managers) => String(managers) === id)[0];

  return String(model.creator._id) !== id || !isAManager;
}

module.exports = {
  getAll(req, res) {
    Group.find()
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  getById(req, res) {
    Group.findOne({ _id: req.params.groupid })
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  updateById(req, res) {
    Group.findOne({ _id: req.params.groupid }).then((group) => {
      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      if (req.body.groupName) {
        group.set({ groupName: req.body.groupName });
      }

      if (req.body.details) {
        group.set({ details: req.body.details });
      }

      group
        .save()
        .then(() => res.json(group))
        .catch((err) => res.status(400).json(err));
    });
  },

  addManagersToGroup(req, res) {
    Group.findById(req.params.groupid).then((group) => {
      if (group === null) {
        res.status(400).json({ message: 'Group does not exist' });
      }

      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      const managersBody = req.body.managers;
      const existingManagers = group.managers.map((manager) => String(manager));
      let managersClean = [];

      if (Array.isArray(managersBody)) {
        managersClean = uniq(managersBody);
      } else if (typeof managersBody === 'string') {
        managersClean.push(managersBody);
      }

      group.managers = uniq([...existingManagers, ...managersClean]);

      group.save(function() {
        groupPopulate(group, res);
      });
    });
  },

  removeManagersFromGroup(req, res) {
    Group.findById(req.params.groupid).then((group) => {
      if (group === null) {
        res.status(400).json({ message: 'Group does not exist' });
      }

      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      const managersBody = req.body.managers;
      const existingManagers = group.managers.map((manager) => String(manager));
      let managersClean = [];

      if (Array.isArray(managersBody)) {
        managersClean = uniq(managersBody);
      } else if (typeof managersBody === 'string') {
        managersClean.push(managersBody);
      }

      const newManagersList = difference(existingManagers, managersClean);

      group.managers = newManagersList;

      group.save(function() {
        groupPopulate(group, res);
      });
    });
  },

  addMembersToGroup(req, res) {
    Group.findById(req.params.groupid).then((group) => {
      if (group === null) {
        res.status(400).json({ message: 'Group does not exist' });
      }

      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      const membersBody = req.body.members;
      const existingMembers = group.members.map((member) => String(member));
      let membersClean = [];

      if (Array.isArray(membersBody)) {
        membersClean = uniq(membersBody);
      } else if (typeof membersBody === 'string') {
        membersClean.push(membersBody);
      }

      group.members = uniq([...existingMembers, ...membersClean]);

      group.save(function() {
        groupPopulate(group, res);
      });
    });
  },

  removeMembersFromGroup(req, res) {
    Group.findById(req.params.groupid).then((group) => {
      if (group === null) {
        res.status(400).json({ message: 'Group does not exist' });
      }

      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      const membersBody = req.body.members;
      const existingMembers = group.members.map((member) => String(member));
      let membersClean = [];

      if (Array.isArray(membersBody)) {
        membersClean = uniq(membersBody);
      } else if (typeof membersBody === 'string') {
        membersClean.push(membersBody);
      }

      const newMembersList = difference(existingMembers, membersClean);

      group.members = newMembersList;

      group.save(function() {
        groupPopulate(group, res);
      });
    });
  },

  addCrewToGroup(req, res) {
    Group.findById(req.params.groupid).then((group) => {
      if (group === null) {
        res.status(400).json({ message: 'Group does not exist' });
      }

      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      const crewBody = req.body.crew;
      const existingCrew = group.crew.map((crew) => String(crew));
      let crewClean = [];

      if (Array.isArray(crewBody)) {
        crewClean = uniq(crewBody);
      } else if (typeof crewBody === 'string') {
        crewClean.push(crewBody);
      }

      group.crew = uniq([...existingCrew, ...crewClean]);

      group.save(function() {
        groupPopulate(group, res);
      });
    });
  },

  removeCrewFromGroup(req, res) {
    Group.findById(req.params.groupid).then((group) => {
      if (group === null) {
        res.status(400).json({ message: 'Group does not exist' });
      }

      if (validateUserIsAdmin(group, req.auth_user_id)) {
        return res.status(400).json({ message: 'Not the owner' });
      }

      const crewBody = req.body.crew;
      const existingCrew = group.crew.map((crew) => String(crew));
      let crewClean = [];

      if (Array.isArray(crewBody)) {
        crewClean = uniq(crewBody);
      } else if (typeof crewBody === 'string') {
        crewClean.push(crewBody);
      }

      const newCrewList = difference(existingCrew, crewClean);

      group.crew = newCrewList;

      group.save(function() {
        groupPopulate(group, res);
      });
    });
  },

  deleteById(req, res) {
    Group.findOneandDelete(req.params.bandid)
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  createNew(req, res) {
    const { groupName } = req.body;

    Group.findOne({ groupName }).then((existingGroup) => {
      if (existingGroup) {
        return res.status(400).json({ error: 'Group Already Exists' });
      }
      const group = new Group({
        ...req.body,
        creator: req.auth_user_id,
      });

      group
        .save()
        .then((newGroup) => res.json(newGroup))
        .catch((err) => res.status(400).json(err));
    });
  },
};
