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
                ctx.scale(0.8, 0.8);
                ctx.drawImage(image, -image.width/2.3, -8);
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
            wrect = select('#wrect'),
            logo = select('#logoWrap'),
            canvas = select('#canvas'),
            bg = select('#bg'),
            spot = select('#spot'),
            spotColor = select('#spotColor'),
            logoColor = selectAll('.logoColor'),
            logoText = select('#logoText'),
            hashtag = select('#hashtag'),
            paintedhands = select('#paintedHands'),
            paintedhands1 = select('#paintedHands1'),
            realhands = select('#realHands'),
            hands = selectAll('.hands'),
            cta = select('#cta'),
            span = selectAll('.text > span')
            text1 = selectAll('#text1 > span'),
            text2 = selectAll('#text2 > span'),
            text3 = selectAll('#text3 > span');            

        animate();
        
        TweenMax.from(canvas, 5, {y:"-=200", ease:Back.easeOut});
        
        TweenMax.fromTo(canvas, 2, {rotation:2, transformOrigin:"50% -100px"}, {
            rotation:-2, ease:Power2.easeInOut, yoyo:true, repeat:4, onComplete:function(){
                TweenMax.to(canvas, 2, {rotation:0, transformOrigin:"50% -100px", ease:Power2.easeInOut});
        }});
        // TweenMax.to(canvas, 10, {x:"0", ease:Back.easeOut});
        function animate() {
          
            tl
            
            .set([spot, span, hands], {alpha:0})
            
            .to(wrect, 0.7, {alpha:0, ease:Linear.easeNone})

    // Frame-1
            .addLabel("fr", "+=1")

            .to(canvas, 0.2, {opacity:1, ease:Power2.easeOut}, "fr")
            .to(spot, 2, {opacity:1, ease:Power2.easeOut}, "fr+=0.5")
            .staggerTo(text1, 1, {opacity:1, ease:Linear.easeNone}, 0.5, "fr+=3")
            .from(cta, 0.7, {opacity:1, y:"+=80", ease:Power2.easeOut}, "fr+=4.6")
            .to(cta, 0.7, {opacity:1}, "fr+=4.8")

    // Frame-2 
    
            .addLabel("fr2", "+=1")  

            .to(canvas, 1.5, {y:"-=200", ease:Back.easeIn}, "fr2")  
            .from(paintedhands, 4, {opacity:1, y:"+=180", ease:Power2.easeOut}, "fr2+=0.7")                   
            .from(paintedhands1, 4, {opacity:0, y:"+=180", ease:Power2.easeOut}, "fr2+=0.1")
            .to(paintedhands1, 2, {opacity:1, ease:Power2.easeIn}, "fr2+=2.4")
            .to(paintedhands, 2, {opacity:0}, "fr2+=3.3")
            .to(text1, 0.8, {opacity:0}, "fr2+=4.2")
            .staggerTo(text2, 0.8, {opacity:1, ease:Linear.easeNone}, 0.8, "fr2+=5.2")         
            
    // Frame-3 
    
            .addLabel("fr3", "+=0.5")   
            
            .to(paintedhands1, 3, {opacity:0}, "fr3")
            .to(realhands, 6, {opacity:1, ease:Power2.easeIn}, "fr3-=1")
            .to(bg, 2, {backgroundColor:"#00aeef", delay:0.5}, "fr3+=2.1")
            .to(spotColor, 2, {fill:"rgb(61, 190, 239)", delay:0.5}, "fr3+=2.1")
            .to(cta, 0.5, {background:"#fff", color:"rgb(0, 174, 239)", delay:0.5}, "fr3+=2")  
            .to(text2, 0.5, {opacity:0}, "fr3+=1")
            .to(logoColor, 2, {fill:"#ffffff", ease:Power2.easeIn}, "fr3+=1.6")
            .to(logoText, 2, {color:"#ffffff", ease:Power2.easeIn}, "fr3+=1.6")                      
            .staggerTo(text3, 0.8, {opacity:1, ease:Linear.easeNone}, 0.5, "fr3+=4.8") 
            .to(spotColor, 2, {opacity:0}, "fr3+=4.8")
            .to(hashtag, 0.6, {text:"#MAKEAPROMISE", ease:Linear.easeNone}), "fr3+=4.8";

        }
};
        