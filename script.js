/************************* Canvas-chain *************************/

    //var $window = $(window);
    //var $canvas = $("#canvas");

    function init() {
        var canvas  = document.getElementById("canvas");
        var ctx = canvas.getContext('2d');
        var image = document.getElementById('source');
        
        var w = canvas.width;
        var h = canvas.height;
        
        var overCirc = {};
        
        var chainLink = {};
        chainLink.r = 2;
        chainLink.color = "#a1a0a0";
        
        TweenMax.ticker.addEventListener("tick", update);
        
        function drawPartChain(ctx, x1, y1, x2, y2) {
            var dx = x1 - x2,
                dy = y1 - y2;
                
            var d = Math.sqrt(dx*dx + dy*dy);
            var n = Math.floor(d / (chainLink.r*2 + 1));
            
            //console.log(n);
            
            ctx.save();
                ctx.translate(x1, y1);
                for(var i = 0; i < n; i++) {
                    ctx.save();
                        ctx.translate((x2-x1)/n*i, (y2-y1)/n*i);
                        drawLink(ctx);
                    ctx.restore();
                }
            ctx.restore();
        }
        
        function drawLink(ctx) {
            ctx.save();
                ctx.fillStyle = chainLink.color;
                ctx.beginPath();
                    ctx.arc(0, 0, chainLink.r, 0, 2*Math.PI, false);
                    ctx.fill();
                ctx.closePath();
            ctx.restore();
        }
              
        function update() {
            ctx.clearRect(0, 0, w, h);
                
            drawPartChain(ctx, 0, 0, w/2, h/2);
            drawPartChain(ctx, w, 0, w/2, h/2);
            
            ctx.save();
                ctx.translate(w/2, h/2);
                ctx.scale(0.18, 0.18);
                ctx.drawImage(image, -image.width/0.45, -10);
            ctx.restore();
            //ctx.drawImage(images.pic, 0, 0);
        }
    }

    /* Init */

    init();

/*********************** GSAP animation ***********************/

    function politeInit() {

        var select = function(s) {
                return document.querySelector(s);
            },
            selectAll = function(s) {
                return document.querySelectorAll(s);
            },
            tl = new TimelineMax(),
            wrapper = select('#wrapper'),
            logo = select('#logoWrap'),
            canvas = select('#canvas'),
            bg = select('#bg'),
            spotColor = select('#spotColor'),
            logoColor = selectAll('.logoColor'),
            logoText = select('#logoText'),
            hashtag = select('#hashtag'),
            paintedhands = select('#paintedHands'),
            paintedhands1 = select('#paintedHands1'),
            realhands = select('#realHands'),
            cta = select('#cta'),
            text1 = select('#text1'),
            text2 = select('#text2'),
            text3 = select('#text3');            

        animate();

        TweenMax.delayedCall(18.6, function(){
            for(var i = 0; i < uno.length; i++) {
                uno[i].style.webkitAnimationPlayState = 'paused';
                dos[i].style.webkitAnimationPlayState = 'paused';
                tres[i].style.webkitAnimationPlayState = 'paused';
                cuatro[i].style.webkitAnimationPlayState = 'paused';
            }
        })
        
        TweenMax.from(canvas, 10, {y:"-=200", ease:Back.easeOut});
        
        TweenMax.fromTo(canvas, 2, {rotation:2, transformOrigin:"50% -100px"}, {rotation:-2, ease:Power2.easeInOut, yoyo:true, repeat:4, onComplete:function(){
            TweenMax.to(canvas, 2, {rotation:0, transformOrigin:"50% -100px", ease:Power2.easeInOut});
        }});

        function animate() {
          
            tl
        
            .from(logo, 1.9, {alpha:0, y:"-=100", ease:Linear.easeNone})           
            .to(text1, 0.8, {opacity:1, ease:Power4.easeIn}, "+=0.1")
            .from(cta, 0.8, {alpha:0, y:"+=80", ease:Linear.easeNone}, "-=1")
            .to(canvas, 0.8, {opacity:0}, "+=2.2")
            .to(text1, 0.8, {opacity:0}, "-=0.8")
            .to(text2, 0.8, {opacity:1, ease:Power4.easeIn}, "+=0.05")
            .to(paintedhands, 0.8, {opacity:1, ease:Power4.easeIn}, "-=0.8")
            .to(paintedhands, 0.8, {opacity:0}, "+=0.5")
            .to(paintedhands1, 0.8, {opacity:1, ease:Power4.easeIn}, "-=0.4")
            .to(paintedhands1, 0.8, {opacity:0}, "+=1.2")
            .to(text2, 0.8, {opacity:0}, "-=0.8")          
            .to(bg, 2, {backgroundColor:"#00aeef", delay:0.5})
            .to(spotColor, 2, {fill:"rgb(61, 190, 239)", delay:0.5}, "-=2")
            .to(cta, 2, {backgroundColor:"#fff", color:"rgb(0, 174, 239)", delay:0.5}, "-=2")
            .to(text3, 2, {opacity:1, ease:Power4.easeIn}, "-=2")
            .to(logoColor, 0.8, {fill:"#ffffff", ease:Power4.easeIn}, "-=2")
            .to(logoText, 0.8, {color:"#ffffff", ease:Power4.easeIn}, "-=2")
            .to(realhands, 0.8, {opacity:1, ease:Power4.easeIn}, "-=2")
            .to(hashtag, 0.8, {opacity:1, ease:Power4.easeIn}, "+=0.3")
 
        }
};
        