import { expect, use } from 'chai';
import { ethers, waffle } from 'hardhat';
import { simpleFixture } from './shared/index';

import { Wallet } from 'ethers';
import { Timelock } from '../dist/types';

use(waffle.solidity);

describe('Timelock', () => {
  let user: Wallet, other: Wallet;
  let timelock: Timelock;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;

  before('create fixture loader', async () => {
    [user, other] = await (ethers as any).getSigners();
    loadFixture = waffle.createFixtureLoader([user, other]);
  });

  beforeEach('deploy fixture', async () => {
    ({ timelock } = await loadFixture(simpleFixture));
  });

  it('set/get', async () => {
    await timelock.set(33);
    expect(await timelock.get()).eq(33);
    await expect(timelock.set(22)).revertedWith('Locked');

    await ethers.provider.send('evm_increaseTime', [604800]); // 604800
    await ethers.provider.send('evm_mine', []);
    await expect(timelock.set(22)).not.reverted;
    expect(await timelock.get()).eq(22);
  });
});
