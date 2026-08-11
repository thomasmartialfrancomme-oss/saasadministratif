export default function sitemap(){
  const base='https://autoadmin.example';
  return ['','/login','/register','/contact','/legal/cgu','/legal/confidentialite'].map(p=>({url: base+p, lastModified: new Date()}))
}
