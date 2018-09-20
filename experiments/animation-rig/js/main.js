var prevData = "clip: idle; crossFadeDuration: .3";;
var listenerAdded = false;
var scene = document.querySelector('a-scene');
var playOnce = false;
var sceneT = null;

AFRAME.registerComponent('rig-control', {
  schema: {
    default: ''
  },
  init() {

    var avatar = document.querySelector('#test');
    var scene = document.querySelector('a-scene');

    var loader = new THREE.FBXLoader();

    //Can load animation sets from a single fbx, and apply it to a different fbx
    //Or load a single animation from an fb and apply it to a different fbx
    loader.load('../models/fbx/samba anims.fbx', function (object) {
      avatar.addEventListener('model-loaded', function () {
        var model = avatar.getObject3D('mesh');
        if (!object.animations) {
          console.warn('animation fbx does not contain animations!');
          return;
        }

        if (object.animations.constructor === Array) {
          model.animations = model.animations.concat(object.animations);
        } else {
          model.animations.push(object.animations);
        }
        console.log(model);
        document.addEventListener('keydown', function (e) {
          if (e.key == '1') {
            console.log('looks painful');
            avatar.setAttribute('animation-rig', 'clip: Armature|idle; crossFadeDuration: .3;');
          } else if (e.key == '2') {
            avatar.setAttribute('animation-rig', 'clip: Armature|dance; crossFadeDuration: .3;');
          }
        });
      });
    });

  }
});