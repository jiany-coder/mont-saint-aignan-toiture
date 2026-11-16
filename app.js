(function(){
  var b=document.getElementById('burger'),n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false')});
    n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded','false')}})}
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(el){io.observe(el)})}
  else{els.forEach(function(el){el.classList.add('in')})}
  var lm=document.getElementById('loadmap');
  document.querySelectorAll('#loadmap').forEach(function(btn){btn.addEventListener('click',function(){
    var m=btn.closest('.map');var f=document.createElement('iframe');
    f.src='https://www.google.com/maps?q=Mont-Saint-Aignan,+76130&output=embed';f.title='Carte du secteur de Mont-Saint-Aignan';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';
    m.innerHTML='';m.appendChild(f)})});
  document.querySelectorAll('form.q').forEach(function(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var msg=form.querySelector('.msg'),btn=form.querySelector('button[type=submit]');
      var nom=form.nom.value.trim(),tel=form.telephone.value.trim();
      msg.className='msg';
      if(!nom||tel.replace(/\D/g,'').length<9){msg.className='msg ko';msg.textContent='Merci d’indiquer votre nom et un numéro de téléphone valide.';return}
      btn.disabled=true;
      var d=new FormData(form);
      d.append('_subject','Nouvelle demande de devis - montsaintaignan-toiture.fr');
      d.append('_captcha','false');d.append('_template','table');d.append('page',location.href);
      fetch('https://formsubmit.co/ajax/renovationartisan@gmail.com',{method:'POST',body:d,headers:{'Accept':'application/json'}}).then(function(r){
        if(!r.ok)throw new Error('http');return r.json();
      }).then(function(j){
        if(j&&String(j.success)==='false')throw new Error('fs');
        msg.className='msg ok';msg.textContent='Merci ! Votre demande est bien envoyée, nous vous rappelons rapidement.';form.reset();
      }).catch(function(){
        msg.className='msg ko';msg.innerHTML='L’envoi a échoué. Appelez-nous directement au <a href="tel:+33614714329"><b>06 14 71 43 29</b></a>.';
      }).finally(function(){btn.disabled=false});
    });
  });
})();
