// Entity Class
function Entity (name, health, asset, scale) {
  this.name = name || 'blob';
  this.health = health || 1;
  this.asset = asset || 'assets/resource/Blob.png';
  this.scale = scale || 1;

  this.sprite = undefined;
}

Entity.prototype.isAlive = function () {
  return this.health > 0;
};

Entity.prototype.kill = function () {
  this.health = 0;
  this.sprite.exists = false;
  this.sprite.removeNextStep = true;
};
