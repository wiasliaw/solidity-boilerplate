import { ethers } from 'hardhat';

import { Fixture } from 'ethereum-waffle';
import { Simple, Timelock } from '../../dist/types';

interface SimpleFixture {
  simple: Simple;
  timelock: Timelock;
}

export const simpleFixture: Fixture<SimpleFixture> =
  async function (): Promise<SimpleFixture> {
    // simple
    const simple = (await (
      await ethers.getContractFactory('Simple')
    ).deploy()) as Simple;
    await simple.deployed();

    // timelock
    const timelock = (await (await ethers.getContractFactory('Timelock'))
      .deploy()) as Timelock;
    await timelock.deployed();

    return {
      simple,
      timelock,
    };
  };
