const WA="256782751931",EMAIL="Kanonyashoebilltours@gmail.com",PHONES=["+256704142043","+256746360023","+256748550605"];
const PAGES=[["index.html","Home"],["tour.html","The Tour"],["pricing.html","Pricing"],["gallery.html","Gallery"],["contact.html","Contact"]];
const PHOTOS=[["shoebill-portrait","The shoebill up close at Mabamba Swamp"],["shoebill-papyrus","Standing quietly in the papyrus"],["grey-crowned-cranes","Grey crowned cranes, Uganda's national bird"],["guest-photographer-canoe","Shooting from the canoe with your guide"],["sunrise-birding","Early morning in the channels"],["canoe-photographer","Gliding through the water lilies"],["canoe-guests","Our guides pole you through the reeds"]];
const cur=(location.pathname.split("/").pop()||"index").replace(".html","")+".html";
const price=n=>n<=1?80:n==2?60:50;
document.getElementById("hdr").innerHTML=`<div class="bar"><a class="brand" href="index.html"><img src="images/logo.jpg" alt="Kanonya Shoebill Tours logo"><span>Kanonya Shoebill Tours</span></a><button id="burger" aria-label="Menu">☰</button><nav class="m" id="nav">${PAGES.map(p=>`<a href="${p[0]}" class="${cur==p[0]?"on":""}">${p[1]}</a>`).join("")}<a class="btn" href="book.html" data-book>Book now</a></nav></div>`;
document.getElementById("ftr").innerHTML=`<footer><div class="wrap"><div class="grid g3" style="margin-top:0"><div><h3>Kanonya Shoebill Tours</h3><p>Guided shoebill and birding canoe trips on Mabamba Swamp, departing Nakiwogo landing site, Entebbe, Uganda.</p></div><div><h3>Pages</h3>${PAGES.map(p=>`<a href="${p[0]}">${p[1]}</a>`).join("")}<a href="book.html">Book now</a></div><div><h3>Contact</h3><a href="https://wa.me/${WA}">WhatsApp +${WA.replace(/(\d{3})(\d{3})(\d{6})/,"$1 $2 $3")}</a><a href="mailto:${EMAIL}">${EMAIL}</a>${PHONES.map(p=>`<a href="tel:${p}">${p}</a>`).join("")}</div></div><p class="copy">© ${new Date().getFullYear()} Kanonya Shoebill Tours. Nakiwogo, Entebbe, Uganda.</p></div></footer><a class="wa" href="https://wa.me/${WA}" aria-label="WhatsApp us">💬</a><div id="go"><div><h2 id="gow"></h2><small>Kanonya Shoebill Tours</small></div></div>`;
const hdr=document.getElementById("hdr"),nav=document.getElementById("nav");
const sc=()=>hdr.classList.toggle("solid",scrollY>40||!document.querySelector(".hero,.ph"));sc();addEventListener("scroll",sc,{passive:true});
document.getElementById("burger").onclick=()=>nav.classList.toggle("open");
/* typing words */
const t=document.querySelector("[data-type]");
if(t){const w=t.dataset.type.split("|");let i=0,c=0,d=0;(function tick(){const s=w[i];c+=d?-1:1;t.textContent=s.slice(0,c);let ms=d?45:90;if(!d&&c==s.length){d=1;ms=1500}else if(d&&c==0){d=0;i=(i+1)%w.length;ms=350}setTimeout(tick,ms)})()}
/* booking animation: words play, then page opens */
const go=document.getElementById("go"),gow=document.getElementById("gow");
document.addEventListener("click",e=>{const a=e.target.closest("[data-book]");if(!a||cur=="book.html")return;e.preventDefault();
const msgs=["Preparing your canoe…","Waking the shoebill…","Papyrus channels ahead…","Let's book your tour!"];go.classList.add("on");let k=0;gow.textContent=msgs[0];
const iv=setInterval(()=>{k++;if(k<msgs.length)gow.textContent=msgs[k];else{clearInterval(iv);location.href=a.href}},520)});
addEventListener("pageshow",()=>go.classList.remove("on"));
/* gallery + teaser */
const mk=(n,cls)=>`<figure><img src="images/${PHOTOS[n][0]}.jpg" alt="${PHOTOS[n][1]}" loading="lazy"><figcaption>${PHOTOS[n][1]}</figcaption></figure>`;
const gal=document.getElementById("gal");if(gal){gal.innerHTML=PHOTOS.map((_,n)=>mk(n)).join("");
const lb=document.createElement("div");lb.id="lb";document.body.appendChild(lb);
gal.onclick=e=>{const f=e.target.closest("figure");if(!f)return;lb.innerHTML=`<img src="${f.querySelector("img").src}" alt=""><p>${f.querySelector("figcaption").textContent}</p>`;lb.classList.add("on")};lb.onclick=()=>lb.classList.remove("on")}
const te=document.getElementById("tease");if(te)te.innerHTML=["shoebill-papyrus","sunrise-birding","grey-crowned-cranes"].map(k=>{const p=PHOTOS.find(x=>x[0]==k);return `<img src="images/${p[0]}.jpg" alt="${p[1]}" loading="lazy">`}).join("");
/* booking form */
const f=document.getElementById("bk");
if(f){const tr=f.travellers,q=document.getElementById("q"),dt=f.date;dt.min=new Date().toISOString().slice(0,10);
const up=()=>{const n=Math.max(1,+tr.value||1);q.innerHTML=`$${price(n)} × ${n} = <span>$${price(n)*n}</span>`};tr.oninput=up;up();
f.onsubmit=e=>{e.preventDefault();const n=Math.max(1,+tr.value||1),v=x=>f[x].value.trim();
const msg=`Hello Kanonya Shoebill Tours! I'd like to book the Mabamba shoebill tour.%0AName: ${encodeURIComponent(v("fullname"))}%0APhone: ${encodeURIComponent(v("phone"))}%0ADate: ${v("date")}%0ATravellers: ${n}%0AEstimated total: $${price(n)*n}%0A${encodeURIComponent(v("message"))}`;
f.style.display="none";document.getElementById("ok").classList.add("on");document.getElementById("wal").href=`https://wa.me/${WA}?text=${msg}`;document.getElementById("mal").href=`mailto:${EMAIL}?subject=Tour booking&body=${msg.replace(/%0A/g,"%0D%0A")}`;setTimeout(()=>location.href=document.getElementById("wal").href,1800)}}
/* hero slideshow */
const sl=[...document.querySelectorAll(".slides div")];
if(sl.length){const dots=document.getElementById("dots");let cur2=0,timer;
sl.forEach((_,i)=>{const b=document.createElement("button");b.setAttribute("aria-label","Photo "+(i+1));b.onclick=()=>{show(i);restart()};dots.appendChild(b)});
function show(i){sl[cur2].classList.remove("on");dots.children[cur2].classList.remove("on");cur2=i;void sl[i].offsetWidth;sl[i].classList.add("on");dots.children[i].classList.add("on")}
function restart(){clearInterval(timer);timer=setInterval(()=>show((cur2+1)%sl.length),6000)}
show(0);restart()}
/* scroll reveal */
document.documentElement.classList.add("js");
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".card,.split>*,.tease img,.steps li,.cta,.list li,.gal figure,.quote").forEach((el,i)=>{el.classList.add("rv");el.style.transitionDelay=(i%4)*90+"ms";io.observe(el)});
