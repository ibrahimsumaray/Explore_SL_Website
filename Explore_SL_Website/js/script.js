
document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('.nav-links');
  if(menu&&nav) menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));});
  const modal=document.getElementById('enquiryModal');
  document.querySelectorAll('[data-enquiry-open]').forEach(b=>b.addEventListener('click',()=>{if(modal){modal.classList.add('open');document.body.style.overflow='hidden';}}));
  document.querySelectorAll('[data-enquiry-close]').forEach(b=>b.addEventListener('click',closeModal));
  if(modal) modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
  function closeModal(){if(modal){modal.classList.remove('open');document.body.style.overflow='';}}
  const form=document.getElementById('enquiryForm');
  if(form) form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form).entries());
    const ref='ESL-'+Math.random().toString(36).slice(2,8).toUpperCase();
    const success=document.getElementById('enquirySuccess');
    success.innerHTML=`<strong>Thank you, ${escapeHtml(data.name)}!</strong><br>Your enquiry reference is <b>${ref}</b>. This demonstration stores no information and has not sent an email. Please contact Explore SL directly to arrange your trip.`;
    success.classList.add('show');form.reset();
  });
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const buttons=group.querySelectorAll('[data-filter]');
    const target=group.dataset.filterGroup;
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(x=>x.classList.remove('active'));btn.classList.add('active');
      document.querySelectorAll(`[data-category][data-list="${target}"]`).forEach(card=>{
        const f=btn.dataset.filter;card.hidden=!(f==='all'||card.dataset.category.split(' ').includes(f));
      });
    }));
  });
  const search=document.getElementById('destinationSearch');
  if(search) search.addEventListener('submit',e=>{
    e.preventDefault();const q=(new FormData(search).get('destination')||'').toString().toLowerCase();
    const result=document.getElementById('searchResults');if(result){result.classList.add('show');result.textContent=q?`Explore destinations related to “${q}” on our Destinations page, or send us an enquiry.`:'Choose a destination or send us an enquiry and our team can help you plan.';}
  });
  const newsletter=document.getElementById('newsletterForm');
  if(newsletter)newsletter.addEventListener('submit',e=>{e.preventDefault();const m=document.getElementById('newsletterMessage');m.textContent='Thank you for your interest! This demo does not subscribe or store your email.';});
});
