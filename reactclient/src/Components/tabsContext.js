import React from 'react';

const TabsContext = React.createContext({
  memoryTab: 'memory_one',
  cpuTab: 'cpu_one',
  diskTab: 'disk_one',
  setMemoryTab: () => {},
  setCpuTab: () => {},
  setDiskTab: () => {},
});

export default TabsContext;
