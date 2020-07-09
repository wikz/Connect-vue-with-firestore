const config = {
  collection: 'users',
  doc: 'user1',
  debounceTime: 1400
};

const STATES = {
  LOADING: "Loading",
  MODIFIED: 'Modified',
  ERROR: 'Error',
  SYNCED: 'Synced'
}

export { config, STATES };