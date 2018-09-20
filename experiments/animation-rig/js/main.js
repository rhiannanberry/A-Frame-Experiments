var prevData = "clip: idle; crossFadeDuration: .3";;
    var listenerAdded = false;
    var scene = document.querySelector('a-scene');  
    var playOnce = false;
    var sceneT = null;

AFRAME.registerComponent('rig-control', {
  schema: {default: ''},
  init() {
     
    var avatar = document.querySelector('#test');  
    var scene = document.querySelector('a-scene');

    var loader = new THREE.FBXLoader();

    //Can load animation sets from a single fbx, and apply it to a different fbx
    //Or load a single animation from an fb and apply it to a different fbx
    loader.load( '../models/fbx/samba anims.fbx', function ( object ) {
      avatar.addEventListener('model-loaded', function() {
        var model = avatar.getObject3D('mesh');
        if (!object.animations){
          console.warn('animation fbx does not contain animations!');
          return;
        }

        if (object.animations.constructor === Array) {
          model.animations = model.animations.concat(object.animations);
        } else {
          model.animations.push(object.animations);
        }
        console.log(model);
        document.addEventListener('keydown', function(e) {
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


        
AFRAME.registerComponent('animation-control', {
  schema: {default: ''},
  init() {
     
    const bot = document.querySelector('#bot'); 
    var jumpBut = document.querySelector('#jump');
    var runBut = document.querySelector('#run');
    var walkBut = document.querySelector('#walk');
    var idleBut = document.querySelector('#idle');  
    var scene = document.querySelector('a-scene');
    
   
  
  this.el.addEventListener('click', () => {
        
      if (this.el != jumpBut){  
        bot.setAttribute("animation-mixer",this.data); 
         scene.removeEventListener('animation-loop', jumpTrans);
         prevData = this.data;
         
     }
        
     if (this.el == jumpBut) {
        
        bot.setAttribute("animation-mixer",this.data); 
        var jumpTrans = function () {scene.removeEventListener('animation-loop',jumpTrans); bot.setAttribute("animation-mixer",prevData);console.log("scene ="+scene); console.log("fire")};  
        console.log("prev data from jump button = "+prevData); 
       setTimeout (function(){scene.addEventListener('animation-loop',jumpTrans);},500);     
     
     }
        
     
    }); 
      
      
      
  }
});