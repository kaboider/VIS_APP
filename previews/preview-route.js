(() => {
  function go(raw){
    const target=new URL(raw,location.origin);
    location.hash=`${target.pathname}${target.search}${target.hash}`;
    location.reload();
  }
  for(const method of ['pushState','replaceState']){
    const native=history[method].bind(history);
    history[method]=(state,title,url)=>{
      if(typeof url==='string'&&url.startsWith('/')){go(url);return}
      return native(state,title,url);
    };
  }
  document.addEventListener('click',event=>{
    const anchor=event.target.closest('a[href]');
    if(!anchor||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.target==='_blank')return;
    const raw=anchor.getAttribute('href');
    if(!raw||raw.startsWith('#')||/^(https?:|mailto:|tel:|javascript:)/i.test(raw))return;
    const target=new URL(raw,location.origin);
    if(target.origin!==location.origin)return;
    event.preventDefault();
    go(raw);
  },true);
})();
