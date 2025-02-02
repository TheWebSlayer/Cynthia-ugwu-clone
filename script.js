const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

function firstPageanim(){
    var t1 = gsap.timeline();

    t1.from("#nav",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

    .to(".bounding-elem",{
        y: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut,
        stagger: .2
    })

    .from("#hero-footer",{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

var timeout;

//jab mouse move hoga tab jo circle hai use chapta karna hai 

function  circleChaptaKaro(){

    //define default scale value
    
    var xscale = 1;;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){

         //mouse move hoga to uska jo current position se purana position minus hojayega

        //max range 1 rakhenge aur minimum value 0.8 rakhenge

       clearTimeout(timeout)

        xscale = gsap.utils.clamp(.8,1.2, dets.clientX - xprev); //max diifference 1 aur min .8 smjhe badda
        yscale = gsap.utils.clamp(.8,1.2, dets.clientY - yprev); //max diifference 1 aur min .8 phirse smjhe badda

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function(){
            document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100);
    });
}



function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}

circleMouseFollower();
firstPageanim();
circleChaptaKaro();

// ye second page ka task hai

//  teeno element select karna hai , uske baad teeno element par ek mousemove lagao,
//  jab mousemove ho to pata karo ki mouse kaha par hai,
//  jiska matlab hai ki mouse ki x aur y position pata karo,
//  ab mouse ki x y position ke badle us image ko show karo aur us image ko move karo,
//  move karte waqt rotate karo,
//  aur jaise jaise mouse tezz chale wese wese rotation bhi tezz ho jaye.

document.querySelectorAll("#elem").forEach(function(elem){
        var rotate = 0;
        var diffrot= 0;
        
    elem.addEventListener("mousemove", function(dets){
        
        var diff = elem.clientY - elem.getBoundingClientRect().top;
        diffrot =  dets.clientX - rotate;
        rotate = dets.clientX;


        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            duration: 0.5,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot*0.5)
        })
    });

    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    });
});