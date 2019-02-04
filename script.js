/*! modernizr 3.3.1 (Custom Build) | MIT *
     * https://modernizr.com/download/?-touchevents-setclasses !*/
    !function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);
    //Polyfill for map method - Reference: http://es5.github.io/#x15.4.4.19
    Array.prototype.map||(Array.prototype.map=function(r,t){var n,o,e;if(null==this)throw new TypeError(" this is null or not defined");var i=Object(this),a=i.length>>>0;if("function"!=typeof r)throw new TypeError(r+" is not a function");for(arguments.length>1&&(n=t),o=new Array(a),e=0;a>e;){var p,f;e in i&&(p=i[e],f=r.call(n,p,e,i),o[e]=f),e++}return o});
    
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

/************************* Canvas-chain *************************/

    //var $window = $(window);
    //var $canvas = $("#canvas");

    function initCanvas() {
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

    initCanvas();

/*********************** Enabler ***********************/

    if (Enabler.isInitialized()) {
        init();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
    }

    function init() {
        if (Enabler.isPageLoaded()) {
            //Enabler.setProfileId(10012416);
            politeInit();
        } else {
            //Enabler.setProfileId(10012416);
            Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, politeInit);
        }
    };

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
            bgexit = select('#bgexit'),
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
        
        TweenMax.from(canvas, 2.5, {y:"-=200", ease:Back.easeOut});
        
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
            .staggerTo(text1, 1, {opacity:1, ease:Linear.easeNone}, 0.5, "fr+=0.6")
            .from(cta, 0.7, {opacity:1, y:"+=80", ease:Power2.easeOut}, "fr+=2")
            .to(cta, 0.7, {opacity:1}, "fr+=2")

    // Frame-2 
    
            .addLabel("fr2", "+=0.8")  

            .to(canvas, 1.5, {y:"-=200", ease:Back.easeIn}, "fr2")  
            .from(paintedhands, 2, {opacity:1, y:"+=180", ease:Power2.easeOut}, "fr2+=0.7")                   
            .from(paintedhands1, 4, {opacity:0, y:"+=180", ease:Power2.easeOut}, "fr2+=0.1")
            .to(paintedhands1, 0.6, {opacity:1, ease:Power2.easeIn}, "fr2+=1.1")
            .to(paintedhands, 0.6, {opacity:0}, "fr2+=3")
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

        if ((Modernizr.touchevents)&&(!isChrome)) {
            console.log("Touch supported");
            cta.addEventListener('touchend', ctaExitHandler, false);
            bgexit.addEventListener('click', bgExitHandler, false);
            logo.addEventListener('click', logoExitHandler, false);
        } else {
            console.log("Touch not-supported");
            cta.addEventListener('click', ctaExitHandler, false);
            bgexit.addEventListener('click', bgExitHandler, false);
            logo.addEventListener('click', logoExitHandler, false);
        }

        //Exit Handler - we need at least one
        function bgExitHandler(e) {
            Enabler.exit('Background Exit');
            //checkFrame();
            return false;
        }
        
        //Exit Handler - we need at least one
        function logoExitHandler(e) {
            Enabler.exit('Logo Exit');
            //checkFrame();
            return false;
        }

        //Exit Handler - we need at least one
        function ctaExitHandler(e) {
            Enabler.exit('CTA Offer Exit');
            //checkFrame();
            return false;
        }
};
        