import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, ChevronRight, CircleHelp, ClipboardList, Headphones, Home, Layers, Lock, Menu, Orbit, ScanLine, TrainFront, UserPlus, Users, Wallet, X } from 'lucide-react'
import './style.css'

const names = {
  '/signup':'Create Account', '/login':'Log In', '/reset-password':'Reset Password',
  '/contact':'Contact', '/dashboard':'Dashboard', '/plans':'Plans', '/investments':'My Investments',
  '/team':'My Team', '/rewards':'Rewards', '/invest':'Invest Now', '/confirm-deposit':'Confirm Deposit',
  '/deposit':'Deposit', '/withdraw':'Withdraw', '/transfer':'Balance Transfer', '/history':'History',
  '/account':'Account', '/verification':'Verification', '/support':'Support', '/faq':'FAQ',
  '/terms':'Terms', '/privacy':'Privacy', '/network':'Explore the Network'
}
const publicNav = [['/','Home',Home],['/plans','Plans',Layers],['/login','Log In',Lock],['/signup','Sign Up',UserPlus],['/support','Support',Headphones]]
const memberPages = ['/dashboard','/investments','/team','/rewards','/invest','/confirm-deposit','/deposit','/withdraw','/transfer','/history','/account','/verification']
const providers = ['Easypaisa','JazzCash','NayaPay','UBL Bank','UPaisa']
const samplePlans = [['Rail Link',320,80],['Transit Plus',640,80],['Network Select',1280,80]]
const money = amount => 'PKR ' + Number(amount).toLocaleString('en-PK')
const stories = ['Inside the rail terminal','Rapid delivery','Smart warehousing','Connected trade','How the hub works']
const storyNotes = [
  'A rail terminal brings trains, cranes and local road routes together. Containers are staged, lifted and routed onward from one location.',
  'Distribution terminals organize the final leg between a regional rail yard and a local delivery stop.',
  'Warehouses coordinate inventory, loading and dispatch. The route network connects that work to other stops.',
  'Rail yards, delivery routes and warehouses inspired EarnifyHub’s visual identity.',
  'Browse example plans, preview the payment steps and check the activity ledger in the interactive demo.'
]

function go(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
function Link({to, children, ...props}) {
  return <a href={to} {...props} onClick={event => {
    if (event.button || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
    event.preventDefault()
    go(to)
  }}>{children}</a>
}
function Action({to, children, secondary = false}) {
  return <Link to={to} className={'button' + (secondary ? ' secondary' : '')}>{children}</Link>
}
function Tile({to, icon:Icon=ChevronRight, children, detail}) {
  return <Link className="tile" to={to}><Icon size={20}/><span>{children}{detail && <small>{detail}</small>}</span><ChevronRight size={16}/></Link>
}
function Panel({title, children}) {
  return <section className="panel">{title && <h2>{title}</h2>}{children}</section>
}
function Label({title, children}) {
  return <label className="field"><span>{title}</span>{children}</label>
}
function Input({title, ...props}) {
  return <Label title={title}><input {...props}/></Label>
}
function Mobile() {
  return <Label title="Mobile number"><div className="combined"><b>+92</b><input type="tel" placeholder="3XX XXXXXXX" autoComplete="tel-national"/></div></Label>
}
function Password() {
  const [visible, setVisible] = useState(false)
  return <Label title="Password"><div className="combined"><input type={visible ? 'text':'password'} placeholder="Enter your password"/><button type="button" onClick={()=>setVisible(!visible)}>{visible?'Hide':'Show'}</button></div></Label>
}
function Captcha() {
  const [code, setCode] = useState('849273')
  return <Label title="Verification code"><div className="combined"><input inputMode="numeric" placeholder="Enter code"/><code>{code}</code><button type="button" aria-label="Refresh code" onClick={()=>setCode(String(Math.floor(100000+Math.random()*900000)))}>↻</button></div></Label>
}
function Form({next, children, button, message = 'Preview complete. No information was sent.'}) {
  const [done, setDone] = useState(false)
  return <form onSubmit={event=>{event.preventDefault(); next ? go(next):setDone(true)}}>{children}<button className="button wide" type="submit">{button}</button>{done && <p role="status" className="notice">{message}</p>}</form>
}
function HomePage() {
  return <>
    <section className="hero"><div><span className="eyebrow"><Orbit size={15}/> EARNIFYHUB</span><h1>A connected hub for <em>your next move.</em></h1><p>Explore plans, manage funds, and follow your activity from one place.</p></div></section>
    <main className="home-content" id="content">
      <div className="quick"><Tile to="/signup" icon={UserPlus}>Create Account</Tile><Tile to="/login" icon={Lock}>Log In</Tile><Tile to="/support" icon={Headphones}>Customer Support</Tile></div>
      <section className="section"><h2>Explore the network</h2><div className="story-grid">{stories.map((title,i)=><Link key={title} to={'/network?story='+i} className={'story story-'+i}><span>{i<3?'FIELD NOTES':'GUIDE'}</span><strong>{title} <ArrowRight size={15}/></strong></Link>)}</div></section>
      <section className="callout"><h2>Find your next route</h2><div className="actions"><Action to="/signup">Create Account</Action><Action to="/login" secondary>Log In</Action></div></section>
      <div className="signal-strip"><span><Layers size={16}/> Plan details</span><span><Wallet size={16}/> Wallet activity</span><span><Users size={16}/> Team tracking</span></div><section className="network-feature"><h2>One connected trade network</h2><Link to="/network?story=3">Explore the network <ArrowRight size={15}/></Link></section><section className="section"><h2>Featured tools</h2><div className="tools"><Tile to="/investments" icon={ClipboardList}>My Earnings</Tile><Tile to="/team" icon={Users}>My Referral</Tile><Tile to="/account" icon={Orbit}>My Account</Tile></div></section>
      <section className="section"><h2>What’s in your hub</h2><Tile to="/plans" icon={Layers}>Browse plans</Tile><Tile to="/deposit" icon={Wallet}>Manage your wallet</Tile><Tile to="/history" icon={ClipboardList}>Track transactions</Tile><Tile to="/team" icon={Users}>View your team</Tile></section>
      <section className="section"><h2>How it works</h2><ol className="steps"><li>Create an account</li><li>Review a plan</li><li>Review payment instructions</li><li>Track your activity</li></ol></section>
      <section className="callout"><h2>Need help?</h2><div className="actions"><Action to="/contact">Contact support</Action><Action to="/faq" secondary>Read FAQ</Action></div></section>
      <footer><Link to="/"><img src="/media/logo.png" alt="EarnifyHub"/></Link><div><Link to="/contact">Contact</Link><Link to="/terms">Terms</Link><Link to="/privacy">Privacy</Link></div></footer>
    </main>
  </>
}
function Auth({page}) {
  const signup = page === '/signup'
  const reset = page === '/reset-password'
  const [sent, setSent] = useState(false)
  return <Panel><form onSubmit={event=>{event.preventDefault();if(reset && !sent) setSent(true);else go(reset ? '/login':'/dashboard')}}>
    {signup && <Input title="Full name" placeholder="Enter your full name" autoComplete="name"/>}
    <Mobile/>
    {(!reset || sent) && <Password/>}
    {!signup && !reset && <div className="form-links"><label><input type="checkbox"/> Keep me signed in</label><Link to="/reset-password">Forgot password?</Link></div>}
    {(!reset || sent) && <Captcha/>}
    <button className="button wide" type="submit">{reset ? sent?'Save demo password':'Preview reset code' : signup?'Create Account':'Log In'}</button>
  </form><p className="center">{signup ? <>Already have an account? <Link to="/login">Log in</Link></> : reset ? <Link to="/login">Back to Log In</Link> : <>New to EarnifyHub? <Link to="/signup">Create an account</Link></>}</p></Panel>
}
function Plans() {
  return <><div className="notice">Design preview · sample plans</div>{samplePlans.map(([title,amount,days],index)=><Panel key={title}><div className={'plan-art story-'+index}><TrainFront size={24}/></div><h2>{title}</h2><div className="stats"><span>Plan amount<strong>{money(amount)}</strong></span><span>Duration<strong>{days} days</strong></span></div><Action to={'/invest?plan='+index}>Review Plan</Action></Panel>)}</>
}
function Payment({page, query}) {
  const selected = samplePlans[Number(query.get('plan'))] ?? samplePlans[0]
  const investing = page === '/invest'
  const [provider, setProvider] = useState(query.get('method') || providers[0])
  const [amount, setAmount] = useState(investing ? String(selected[1]):(query.get('amount') || '320'))
  const confirm = page === '/confirm-deposit'
  const transfer = page === '/transfer'
  const withdraw = page === '/withdraw'
  const review = page + '?stage=review&amount=' + encodeURIComponent(amount)
  return <><div className="notice">Demo only · no money is moved</div><Panel title={confirm ? 'Payment instructions':investing ? selected[0]:'Wallet details'}>
    {confirm ? <><div className="stats"><span>Method<strong>{provider}</strong></span><span>Example total<strong>{money(amount)}</strong></span></div><p>Sample recipient · Demo account</p><Form button="Submit preview" next="/history?tab=Deposits"><Input title="Transaction ID" placeholder="Sample transaction ID"/><Input title="Payment receipt · JPG or PNG" type="file" accept="image/jpeg,image/png" /></Form></> :
    query.get('stage') === 'review' ? <><p>Review the sample amount before returning to activity.</p><div className="stats"><strong>{money(amount)}</strong></div><Action to="/history">View History</Action></> :
    <Form button={investing?'Continue':withdraw?'Review Withdrawal':transfer?'Review Transfer':'Continue to review'} next={withdraw || transfer ? review:'/confirm-deposit?method='+encodeURIComponent(provider)+'&amount='+encodeURIComponent(amount)}>
      {transfer && <><Select title="From" options={['Deposit Wallet','Earnings Wallet']}/><Select title="To" options={['Earnings Wallet','Deposit Wallet']}/></>}
      <Input title="Amount in PKR" type="number" min="1" step="1" required value={amount} readOnly={investing} onChange={event=>setAmount(event.target.value)}/>
      {!transfer && <Label title={withdraw?'Payout method':'Payment method'}><select value={provider} onChange={event=>setProvider(event.target.value)}>{providers.map(value=><option key={value}>{value}</option>)}</select></Label>}
      {withdraw && <Input title="Recipient" placeholder="Demo recipient"/>}
      {investing && <p>{selected[2]} days · <Link to="/terms">View sample terms</Link></p>}
      <div className="stats"><span>Example fee<strong>PKR 0</strong></span><span>Total<strong>{money(amount)}</strong></span></div>
    </Form>}
  </Panel></>
}
function Select({title,options}) {
  return <Label title={title}><select>{options.map(value=><option key={value}>{value}</option>)}</select></Label>
}
function Contact({ticket}) {
  return <><Panel title={ticket?'Open a ticket':'Send us a message'}><Form button={ticket?'Preview ticket':'Preview message'}>
    {!ticket && <><Input title="Full name" placeholder="Your name"/><Input title="Email" type="email" placeholder="you@example.com"/></>}
    <Select title="Topic" options={['Account','Plans','Wallet','Other']}/>
    {ticket ? <Input title="Subject" placeholder="What can we help with?"/>:<Input title="Mobile number (optional)" type="tel"/>}
    <Label title="Message"><textarea placeholder="How can we help?"/></Label>
    {ticket ? <Input type="file" title="Attachment (optional)"/>:<Captcha/>}
  </Form></Panel><Tile to="/faq" icon={CircleHelp}>Read FAQ</Tile>{ticket ? <Panel title="Recent tickets"><p>No sample tickets yet.</p></Panel>:<Tile to="/support" icon={Headphones}>Support Center</Tile>}</>
}
function Dashboard() {
  return <><Panel title="Welcome to your hub"><p>Available balance · preview</p><strong className="balance">PKR 0.00</strong><div className="actions"><Action to="/deposit">Money In</Action><Action to="/withdraw" secondary>Money Out</Action></div></Panel><Panel title="Wallet activity"><div className="stats"><span>Total deposits<strong>PKR 0</strong></span><span>Total withdrawals<strong>PKR 0</strong></span></div><Link to="/history">See history</Link></Panel><Panel title="Your tools"><Tile to="/investments" icon={Layers}>My Investments</Tile><Tile to="/team" icon={Users}>My Referral and Team</Tile><Tile to="/rewards" icon={Orbit}>Rewards</Tile><Tile to="/transfer" icon={Wallet}>Balance Transfer</Tile></Panel><Tile to="/support" icon={Headphones}>Help Center</Tile></>
}
function History({query}) {
  const tab = query.get('tab') || 'All Transactions'
  const [search,setSearch] = useState('')
  const [filter,setFilter] = useState('All statuses')
  const rows = [['Deposit preview','EH-1001','Under review'],['Deposit preview','EH-1002','Approved'],['Withdrawal preview','EH-1003','Action needed']]
  return <Panel title="Activity preview"><div className="tabs">{['All Transactions','Deposits','Withdrawals'].map(item=><Link key={item} to={'/history?tab='+item} aria-current={tab===item?'page':undefined}>{item}</Link>)}</div><Input title="Search transaction ID" placeholder="EH-1001" value={search} onChange={e=>setSearch(e.target.value)}/><Label title="Status"><select value={filter} onChange={e=>setFilter(e.target.value)}>{['All statuses','Under review','Approved','Action needed'].map(item=><option key={item}>{item}</option>)}</select></Label>{rows.filter(([name,id,status])=>(tab==='All Transactions'||name.startsWith(tab.slice(0,-1)))&&id.toLowerCase().includes(search.toLowerCase())&&(filter==='All statuses'||status===filter)).map(([name,id,status])=><div className="ledger" key={id}><span>{name}<small>{id}</small></span><b>{status}</b></div>)}</Panel>
}
function Team() {
  const [copied,setCopied]=useState(false)
  return <><Panel title="Your referral link"><p>Preview a shareable invitation.</p><button className="button" onClick={async()=>{try{await navigator.clipboard.writeText(window.location.origin+'/signup?ref=demo');setCopied(true)}catch{setCopied(false)}}}>{copied?'Copied':'Copy demo link'}</button></Panel><Panel title="Team overview"><div className="stats"><span>Members<strong>0</strong></span><span>Commission<strong>PKR 0</strong></span></div>{['Direct team','Level 2','Level 3'].map(level=><div className="ledger" key={level}>{level}<b>0 members</b></div>)}</Panel></>
}
function Account() {
  return <><Panel title="Profile preview"><Form button="Preview changes"><Input title="Full name" defaultValue="Demo Member"/><Input title="Mobile number" readOnly value="+92 3•• •••••••"/><Input title="Email" type="email" placeholder="you@example.com"/></Form></Panel><Tile to="/verification" icon={ScanLine}>Verification</Tile><Tile to="/reset-password" icon={Lock}>Change Password</Tile><Tile to="/login">Leave demo dashboard</Tile></>
}
const faqs = [['How do I create an account?','Open Create Account and use the preview form. No account is created in this preview.'],['Where can I see plan details?','Open Plans and choose Review Plan. All displayed amounts and terms are examples.'],['How can I check a deposit?','Open History and select Deposits to see the sample payment statuses.'],['How do I contact support?','Open Support or Contact to preview the available forms.']]
function FAQ() {
  const [search,setSearch]=useState('')
  return <><Panel title="Common questions"><Input title="Search questions" type="search" value={search} onChange={event=>setSearch(event.target.value)}/>{faqs.filter(row=>row.join(' ').toLowerCase().includes(search.toLowerCase())).map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</Panel><Action to="/contact">Contact Support</Action></>
}
function Page({page,query}) {
  if (['/login','/signup','/reset-password'].includes(page)) return <Auth page={page}/>
  if (page === '/dashboard') return <Dashboard/>
  if (page === '/plans') return <Plans/>
  if (['/invest','/deposit','/confirm-deposit','/withdraw','/transfer'].includes(page)) return <Payment page={page} query={query}/>
  if (page === '/history') return <History query={query}/>
  if (page === '/team') return <Team/>
  if (page === '/account') return <Account/>
  if (page === '/contact' || page === '/support') return <Contact ticket={page==='/support'}/>
  if (page === '/faq') return <FAQ/>
  if (page === '/verification') return <Panel title="Status · Not started"><p>Preview the document submission layout using a sample file.</p><Form button="Preview submission"><Select title="Document type" options={['Identity card','Passport']}/><Input type="file" title="Sample document" accept="image/*,.pdf"/></Form></Panel>
  if (page === '/investments' || page === '/rewards') return <><Panel title={page==='/rewards'?'Reward activity':'Plan activity'}><div className="stats"><span>{page==='/rewards'?'Available rewards':'Active plans'}<strong>0</strong></span><span>{page==='/rewards'?'Rewards credited':'Completed plans'}<strong>0</strong></span></div><p>{page==='/rewards'?'No sample rewards available.':'No active plans in this demo.'}</p><Action to={page==='/rewards'?'/team':'/plans'}>{page==='/rewards'?'View My Team':'Explore Plans'}</Action></Panel><Panel title="History"><p>Example activity appears in the transaction ledger.</p><Link to="/history">View transaction history</Link></Panel></>
  if (page === '/terms' || page === '/privacy') return <Panel title="Preview information"><p>This interactive design uses sample records. Forms do not create accounts or submit information to a server.</p><Action to="/contact">Contact Support</Action></Panel>
  if (page === '/network') return <Panel title={stories[Number(query.get('story'))] || stories[0]}><div className={'plan-art story-'+(Number(query.get('story'))||0)}></div><p>{storyNotes[Number(query.get('story'))] || storyNotes[0]}</p><Action to="/plans">Explore Plans</Action></Panel>
  return <Panel title="Page unavailable"><Action to="/">Back to Home</Action></Panel>
}
function App() {
  const [location,setLocation]=useState(window.location.pathname+window.location.search)
  const [menu,setMenu]=useState(false)
  const [page,search]=location.split('?')
  const query = new URLSearchParams(search)
  const member = memberPages.includes(page)
  const nav = member ? publicNav.map(([to,label,Icon])=>[to==='/'?'/dashboard':to,label,Icon]) : publicNav
  const title = names[page] || 'Page unavailable'
  const section = ['/invest','/confirm-deposit'].includes(page) ? '/plans':page
  useEffect(()=>{
    const change=()=>{setLocation(window.location.pathname+window.location.search);setMenu(false)}
    window.addEventListener('popstate',change)
    return ()=>window.removeEventListener('popstate',change)
  },[])
  useEffect(()=>{window.scrollTo(0,0);document.title=page==='/'?'EarnifyHub — Your next move':title+' · EarnifyHub'},[page,title])
  useEffect(()=>{
    const close=event=>{if(event.key==='Escape')setMenu(false)}
    window.addEventListener('keydown',close)
    return ()=>window.removeEventListener('keydown',close)
  },[])
  return <div className="shell">
    <a className="skip" href="#content">Skip to content</a>
    <header><Link className="brand" to="/" aria-label="EarnifyHub home"><img src="/media/logo.png" alt="EarnifyHub"/></Link><div className="header-actions"><Link className="button small" to="/signup">Sign Up</Link><button className="icon-button" aria-expanded={menu} aria-controls={menu?'site-menu':undefined} aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
    {menu && <><button className="scrim" onClick={()=>setMenu(false)} aria-label="Close menu"/><nav id="site-menu" className="drawer" aria-label="Site menu"><Tile to="/" icon={Home}>Homepage</Tile>{(member ? memberPages.concat(['/plans','/support','/faq','/contact','/login']) : ['/plans','/dashboard','/signup','/login','/support','/contact','/faq','/terms','/privacy']).map(path=><Tile key={path} to={path}>{names[path]}</Tile>)}</nav></>}
    {page==='/'?<HomePage/>:<main id="content" className="inner"><div className="banner"><Link to={member&&page!=='/dashboard'?'/dashboard':'/'} aria-label="Back"><ArrowLeft size={19}/></Link></div><div className="page-content"><h1>{page==='/login'?'Welcome back':title}</h1>{['/login','/signup','/reset-password'].includes(page)&&<p className="intro">Use your mobile number to access your hub.</p>}<Page key={page} page={page} query={query}/></div></main>}
    <nav className="bottom" aria-label="Main navigation">{nav.map(([to,label,Icon])=><Link key={to} to={to} aria-current={section===to?'page':undefined}><Icon size={20}/><span>{label}</span></Link>)}</nav>
  </div>
}
createRoot(document.querySelector('#root')).render(<App/>)
