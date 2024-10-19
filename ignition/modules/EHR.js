const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const EHRModule = buildModule("EHRModule", (m) => {
  const token = m.contract("EHR");

  return { token };
});

module.exports = EHRModule;