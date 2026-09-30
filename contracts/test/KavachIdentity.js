const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KavachIdentity", function () {
  let kavach;
  let owner, user1, user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    const KavachIdentity = await ethers.getContractFactory("KavachIdentity");
    kavach = await KavachIdentity.deploy(owner.address);
    await kavach.waitForDeployment();
  });

  it("Should issue a soulbound identity token", async function () {
    // Mint token to user1: clearance 3, dept "R&D"
    await kavach.issueIdentity(user1.address, 3, "R&D");
    expect(await kavach.ownerOf(0)).to.equal(user1.address);
    expect(await kavach.locked(0)).to.be.true; // ERC-5192 check
  });

  it("Should prevent transferring a soulbound token", async function () {
    await kavach.issueIdentity(user1.address, 3, "R&D");
    await expect(
      kavach.connect(user1).transferFrom(user1.address, user2.address, 0)
    ).to.be.revertedWith("Kavach: Token is Soulbound");
  });

  it("Should grant access if ABAC conditions are met", async function () {
    await kavach.issueIdentity(user1.address, 3, "R&D");
    // Request access: resource "Radar", clearance 2, dept "R&D"
    await expect(kavach.connect(user1).requestAccess(0, "Radar", 2, "R&D"))
      .to.emit(kavach, "AccessGranted");
  });

  it("Should deny access if clearance is too low", async function () {
    await kavach.issueIdentity(user1.address, 1, "R&D"); // clearance 1
    // Request access: resource "Radar", clearance 2
    await expect(kavach.connect(user1).requestAccess(0, "Radar", 2, "R&D"))
      .to.emit(kavach, "AccessDenied")
      .withArgs(user1.address, "Radar", "Insufficient clearance");
  });
});
