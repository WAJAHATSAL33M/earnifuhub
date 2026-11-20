import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, ChevronRight, CircleHelp, ClipboardList, Headphones, Home, Layers, Lock, LogOut, Menu, Orbit, ScanLine, TrainFront, UserPlus, Users, Wallet, X } from 'lucide-react'
import './style.css'

const names = {
  '/signup':'Create Account', '/login':'Log In', '/reset-password':'Reset Password',
  '/contact':'Contact', '/dashboard':'Dashboard', '/plans':'Plans', '/investments':'My Investments',
  '/team':'My Team', '/rewards':'Rewards', '/invest':'Invest Now', '/confirm-deposit':'Confirm Deposit',
  '/deposit':'Deposit', '/withdraw':'Withdraw', '/transfer':'Balance Transfer', '/history':'History',
  '/account':'Account', '/verification':'Verification', '/support':'Support', '/faq':'FAQ',
  '/terms':'Terms', '/privacy':'Privacy', '/network':'Explore the Network'
}
const memberPages = ['/dashboard','/investments','/team','/rewards','/invest','/confirm-deposit','/deposit','/withdraw','/transfer','/history','/account','/verification','/contact','/support','/faq','/terms','/privacy','/network']
const providers = ['Easypaisa','JazzCash','NayaPay','UBL Bank','UPaisa']
const samplePlans = [
  ['Plan 1',1000,50,'Local route'],
  ['Plan 2',2000,100,'Regional route'],
  ['Plan 3',5000,200,'Regional route'],
  ['Plan 4',10000,300,'Extended route']
]
const money = amount => 'PKR ' + Number(amount).toLocaleString('en-PK')
const sessionKey = 'earnifyhub-preview-session'
const registeredKey = 'earnifyhub-preview-registered'
const signedIn = () => sessionStorage.getItem(sessionKey) === 'yes'
function safeReturn(value) {
  const pathname = value?.split(/[?#]/)[0]
  return memberPages.includes(pathname) ? value : '/dashboard'
}
function gated(path) {
  return !signedIn() && memberPages.includes(path.split(/[?#]/)[0])
    ? '/signup?next=' + encodeURIComponent(path)
    : path
}
const stories = ['Inside the rail terminal','Rapid delivery','Smart warehousing','Connected trade','How the hub works']
const storyNotes = [
  'A rail terminal brings trains, cranes and local road routes together. Containers are staged, lifted and routed onward from one location.',
  'Distribution terminals organize the final leg between a regional rail yard and a local delivery stop.',
  'Warehouses coordinate inventory, loading and dispatch. The route network connects that work to other stops.',
  'Rail yards, delivery routes and warehouses inspired EarnifyHub’s visual identity.',
  'Browse example plans, preview the payment steps and check the activity ledger in the interactive demo.'
]

function go(path) {
  window.history.pushState({}, '', gated(path))
  window.dispatchEvent(new PopStateEvent('popstate'))
}
function Link({to, children, ...props}) {
  return <a href={gated(to)} {...props} onClick={event => {
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
  return <Label title="Mobile number"><div className="combined"><b>+92</b><input required type="tel" placeholder="3XX XXXXXXX" autoComplete="tel-national"/></div></Label>
}
function Password() {
  const [visible, setVisible] = useState(false)
  return <Label title="Password"><div className="combined"><input required type={visible ? 'text':'password'} placeholder="Enter your password"/><button type="button" onClick={()=>setVisible(!visible)}>{visible?'Hide':'Show'}</button></div></Label>
}
function Captcha() {
  const [code, setCode] = useState('849273')
  return <Label title="Verification code"><div className="combined"><input required inputMode="numeric" placeholder="Enter code"/><code>{code}</code><button type="button" aria-label="Refresh code" onClick={()=>setCode(String(Math.floor(100000+Math.random()*900000)))}>↻</button></div></Label>
}
function Form({next, children, button, message = 'Preview complete. No information was sent.'}) {
  const [done, setDone] = useState(false)
  return <form onSubmit={event=>{event.preventDefault(); next ? go(next):setDone(true)}}>{children}<button className="button wide" type="submit">{button}</button>{done && <p role="status" className="notice">{message}</p>}</form>
}
function HomePage() {
  return <>
    <section id="home" className="hero"><div><span className="eyebrow"><Orbit size={15}/> EARNIFYHUB</span><h1>A connected hub for <em>your next move.</em></h1><p>Explore plans, manage funds, and follow your activity from one place.</p></div></section>
    <main className="home-content" id="content">
      <div className="quick"><Tile to="/signup" icon={UserPlus}>Create Account</Tile><Tile to="/login" icon={Lock}>Log In</Tile><Tile to="/support" icon={Headphones}>Customer Support</Tile></div>
      <section id="explore" className="section"><h2>Explore the network</h2><div className="story-grid">{stories.map((title,i)=><Link key={title} to={'/network?story='+i} className={'story story-'+i}><span>{i<3?'FIELD NOTES':'GUIDE'}</span><strong>{title} <ArrowRight size={15}/></strong></Link>)}</div></section>
      <section id="plans" className="feature-banner plans-banner"><div><span className="eyebrow">PLAN CATALOG</span><h2>Choose a route through the network</h2><p>Compare plan amounts, durations, and payment steps in your hub.</p><Action to="/plans">Explore Plans</Action></div></section>
      <div className="signal-strip"><span><Layers size={16}/> Plan details</span><span><Wallet size={16}/> Wallet activity</span><span><Users size={16}/> Team tracking</span></div>
      <section className="feature-banner network-feature"><div><h2>One connected trade network</h2><p>From rail terminals to regional dispatch, the network brings every route into one view.</p><Link to="/network?story=3">Explore connected trade <ArrowRight size={15}/></Link></div></section>
      <section className="section" id="tools"><h2>Featured tools</h2><div className="tools"><Tile to="/investments" icon={ClipboardList}>My Earnings</Tile><Tile to="/team" icon={Users}>My Referral</Tile><Tile to="/account" icon={Orbit}>My Account</Tile></div></section>
      <section className="section"><h2>What’s in your hub</h2><Tile to="/plans" icon={Layers}>Browse plans</Tile><Tile to="/deposit" icon={Wallet}>Manage your wallet</Tile><Tile to="/history" icon={ClipboardList}>Track transactions</Tile><Tile to="/team" icon={Users}>View your team</Tile></section>
      <section className="feature-banner activity-banner"><div><span className="eyebrow">ACTIVITY CENTER</span><h2>Follow every step from your hub</h2><p>See your plan reviews, wallet activity, and payment status in one place.</p><Action to="/history" secondary>View History</Action></div></section>
      <section className="section" id="how-it-works"><h2>How it works</h2><ol className="steps"><li>Create an account</li><li>Review a plan</li><li>Review payment instructions</li><li>Track your activity</li></ol></section>
      <section className="callout"><h2>Find your next route</h2><div className="actions"><Action to="/signup">Create Account</Action><Action to="/login" secondary>Log In</Action></div></section>
      <section id="help" className="callout"><h2>Need help?</h2><div className="help-actions"><Action to="/contact">Contact Support</Action><Action to="/faq" secondary>Read FAQ</Action></div></section>
    </main>
  </>
}
function Auth({page, query}) {
  const signup = page === '/signup'
  const reset = page === '/reset-password'
  const next = safeReturn(query.get('next'))
  const suffix = query.has('next') ? '?next='+encodeURIComponent(next) : ''
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  function submit(event) {
    event.preventDefault()
    if (reset) {
      if (!sent) setSent(true)
      else go('/login'+suffix)
      return
    }
    if (signup) localStorage.setItem(registeredKey,'yes')
    if (!localStorage.getItem(registeredKey)) {
      setError('Create a demo account first, then you can log in on this device.')
      return
    }
    sessionStorage.setItem(sessionKey,'yes')
    go(next)
  }
  return <><div className="notice">{query.has('next') && signup ? 'Create a demo account to open this section. ' : ''}Preview only · use sample details.</div><Panel><form onSubmit={submit}>
    {signup && <Input required title="Full name" placeholder="Enter your full name" autoComplete="name"/>}
    <Mobile/>
    {(!reset || sent) && <Password/>}
    {!signup && !reset && <div className="form-links"><label><input type="checkbox"/> Keep me signed in</label><Link to={'/reset-password'+suffix}>Forgot password?</Link></div>}
    {(!reset || sent) && <Captcha/>}
    <button className="button wide" type="submit">{reset ? sent?'Save demo password':'Preview reset code' : signup?'Create Account':'Log In'}</button>
    {error && <p role="alert">{error}</p>}
  </form><p className="center">{signup ? <>Already have an account? <Link to={'/login'+suffix}>Log in</Link></> : reset ? <Link to={'/login'+suffix}>Back to Log In</Link> : <>New to EarnifyHub? <Link to={'/signup'+suffix}>Create an account</Link></>}</p></Panel></>
}
function Plans() {
  const [filter,setFilter] = useState('All plans')
  const filters = ['All plans','Local route','Regional route','Extended route']
  return <><Panel title="Deposit wallet"><div className="wallet-summary"><Wallet size={27}/><div><small>Available balance · demo</small><strong>PKR 0.00</strong></div></div><div className="actions"><Action to="/deposit">Deposit</Action><Action to="/investments" secondary>My Investments</Action></div></Panel>
    <p className="notice">Preview only. Daily earnings are illustrative. Plan duration and payout terms are pending.</p>
    <div className="plan-filters" aria-label="Plan categories">{filters.map(item=><button type="button" key={item} aria-pressed={filter===item} onClick={()=>setFilter(item)}>{item}</button>)}</div>
    {samplePlans.map(([title,amount,dailyEarnings,route],index)=>filter!=='All plans' && route!==filter ? null:<section className="panel plan-card" key={title}>
      <div className={'plan-art story-'+(index%5)}><div><span className="eyebrow">{route}</span><h2>{title}</h2></div><TrainFront size={24}/></div>
      <div className="plan-body"><dl className="plan-details"><div><dt>Plan amount</dt><dd>{money(amount)}</dd></div><div><dt>Daily earnings</dt><dd>{money(dailyEarnings)}</dd></div></dl><Action to={'/invest?plan='+index}>Review Plan <ArrowRight size={16}/></Action></div>
    </section>)}
  </>
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
      {investing && <p>{money(selected[2])} in illustrative daily earnings · <Link to="/terms">View sample terms</Link></p>}
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
  return <><Panel title="Profile preview"><Form button="Preview changes"><Input title="Full name" defaultValue="Demo Member"/><Input title="Mobile number" readOnly value="+92 3•• •••••••"/><Input title="Email" type="email" placeholder="you@example.com"/></Form></Panel><Tile to="/verification" icon={ScanLine}>Verification</Tile><Tile to="/reset-password" icon={Lock}>Change Password</Tile></>
}
const faqs = [['How do I create an account?','Open Create Account and use the preview form. No account is created in this preview.'],['Where can I see plan details?','Open Plans and choose Review Plan. All displayed amounts and terms are examples.'],['How can I check a deposit?','Open History and select Deposits to see the sample payment statuses.'],['How do I contact support?','Open Support or Contact to preview the available forms.']]
function FAQ() {
  const [search,setSearch]=useState('')
  return <><Panel title="Common questions"><Input title="Search questions" type="search" value={search} onChange={event=>setSearch(event.target.value)}/>{faqs.filter(row=>row.join(' ').toLowerCase().includes(search.toLowerCase())).map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</Panel><Action to="/contact">Contact Support</Action></>
}
function Page({page,query}) {
  if (['/login','/signup','/reset-password'].includes(page)) return <Auth page={page} query={query}/>
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
function readLocation() {
  const original = window.location.pathname + window.location.search + window.location.hash
  const target = gated(original)
  if (target !== original) window.history.replaceState({}, '', target)
  return target
}
const guestMenu = [['/#home','Homepage'],['/#explore','Explore the Network'],['/#plans','Plans'],['/#tools','Featured Tools'],['/#how-it-works','How It Works'],['/#help','Support'],['/signup','Create Account'],['/login','Log In'],['/contact','Contact'],['/faq','FAQ']]
const memberMenu = [['/dashboard','Dashboard'],['/plans','Plans'],['/investments','My Investments'],['/deposit','Deposit'],['/withdraw','Withdraw'],['/history','History'],['/transfer','Balance Transfer'],['/team','My Team'],['/rewards','Rewards'],['/account','Account'],['/verification','Verification'],['/support','Support'],['/faq','FAQ'],['/contact','Contact']]
function App() {
  const [location,setLocation]=useState(readLocation)
  const [menu,setMenu]=useState(false)
  const [pathname,hash]=location.split('#')
  const [page,search]=pathname.split('?')
  const query = new URLSearchParams(search)
  const member = signedIn()
  const title = names[page] || 'Page unavailable'
  const section = ['/invest','/confirm-deposit'].includes(page) ? '/plans':page
  const nav = [[member?'/dashboard':'/','Home',Home],['/plans','Plans',Layers],['/support','Support',Headphones]]
  useEffect(()=>{
    const change=()=>{setLocation(readLocation());setMenu(false)}
    window.addEventListener('popstate',change)
    return ()=>window.removeEventListener('popstate',change)
  },[])
  useEffect(()=>{
    if (hash) document.getElementById(hash)?.scrollIntoView({block:'start'})
    else window.scrollTo(0,0)
    document.title=page==='/'?'EarnifyHub — Your next move':title+' · EarnifyHub'
  },[location,page,title,hash])
  useEffect(()=>{
    const close=event=>{if(event.key==='Escape')setMenu(false)}
    window.addEventListener('keydown',close)
    return ()=>window.removeEventListener('keydown',close)
  },[])
  function logout() {
    sessionStorage.removeItem(sessionKey)
    go(location === '/' ? '/#home' : '/')
  }
  return <div className="shell">
    <a className="skip" href="#content">Skip to content</a>
    <header><Link className="brand" to="/" aria-label="EarnifyHub home"><img src="/media/logo-light.png" alt="EarnifyHub"/></Link><div className="header-actions">{member && <Link className="account-button" to="/account" aria-label="Account"><UserPlus size={20}/></Link>}<button className="icon-button" aria-expanded={menu} aria-controls={menu?'site-menu':undefined} aria-label={menu?'Close menu':'Open menu'} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
    {menu && <><button className="scrim" onClick={()=>setMenu(false)} aria-label="Dismiss menu"/><nav id="site-menu" className="drawer" aria-label="Site menu">{(member ? memberMenu : guestMenu).map(([path,label])=><Tile key={path} to={path}>{label}</Tile>)}</nav></>}
    {page==='/'?<HomePage/>:<main id="content" className="inner"><div className="banner"><Link to={member&&page!=='/dashboard'?'/dashboard':'/'} aria-label="Back"><ArrowLeft size={19}/></Link></div><div className="page-content"><h1>{page==='/login'?'Welcome back':title}</h1>{['/login','/signup','/reset-password'].includes(page)&&<p className="intro">Use your mobile number to access your hub.</p>}<Page key={pathname} page={page} query={query}/></div></main>}
    <nav className="bottom" aria-label="Main navigation">{nav.map(([to,label,Icon])=><Link key={to} to={to} aria-current={section===to?'page':undefined}><Icon size={20}/><span>{label}</span></Link>)}<button type="button" disabled={!member} onClick={logout}><LogOut size={20}/><span>Logout</span></button></nav>
  </div>
}
createRoot(document.querySelector('#root')).render(<App/>)
