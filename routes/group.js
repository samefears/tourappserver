const group = require('../controllers/group');

module.exports = (router) => {
  // Get all bands
  router.get('/groups', group.getAll);

  // Get Band by ID
  router.get('/groups/:groupid', group.getById);

  // Update Band by ID
  router.put('/groups/:groupid', group.updateById);

  // Add Managers to Group
  router.put('/groups/:groupid/addmanagers', group.addManagersToGroup);

  // Remove Managers from a Group
  router.put('/groups/:groupid/removemanagers', group.removeManagersFromGroup);

  // Add Members to Group
  router.put('/groups/:groupid/addmembers', group.addMembersToGroup);

  // Remove Members from a Group
  router.put('/groups/:groupid/removemembers', group.removeMembersFromGroup);

  // Add Crew to Group
  router.put('/groups/:groupid/addcrew', group.addCrewToGroup);

  // Remove Crew from a Group
  router.put('/groups/:groupid/removecrew', group.removeCrewFromGroup);

  // Delete Band by ID
  router.delete('/groups/:groupid', group.deleteById);

  // Create new Band
  router.post('/groups/new', group.createNew);
};
