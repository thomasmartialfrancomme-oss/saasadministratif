<div className="grid grid-cols-2 gap-2 text-sm">
  {[
    {name:'Gmail', url:'/api/auth/callback/google?scope=https://www.googleapis.com/auth/gmail.readonly'},
    {name:'Outlook', url:'/api/auth/callback/google'},
    {name:'Google Calendar', url:'/api/auth/callback/google'},
    {name:'Google Drive', url:'/api/auth/callback/google'},
    {name:'Stripe', url:'/api/auth/callback/google'},
    {name:'OneDrive', url:'/api/auth/callback/google'},
  ].map(s=> <a key={s.name} href={s.url} className="border rounded-xl p-3 flex items-center justify-between bg-white hover:bg-indigo-50 transition"><span>{s.name}</span><span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">Connecter</span></a>)}
</div>
