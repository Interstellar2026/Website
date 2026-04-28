/* =================================================================
   ATLAS CHATBOT — INTERSTELLAR I.S.
   4-question qualification flow + 30-FAQ tree + 3CX handoff
   ================================================================= */

(function() {
  'use strict';

  // ============ CONFIG ============
  const CONFIG = {
    bookingsUrl: 'https://outlook.office.com/book/BookTimeWithMe@isinterstellar.com/?ismsaljsauthenabled',
    teamChatUrl: 'https://1476.3cx.cloud/interstellaris',
    founderChatUrl: 'https://1476.3cx.cloud/marcshamp',
    phone: '+17207358800',
    phoneDisplay: '(720) 735-8800',
    email: 'admin@isinterstellar.com'
  };

  // ============ STATE ============
  const state = {
    step: 'opening',
    qualification: { industry: null, size: null, pain: null, urgency: null }
  };

  // ============ DOM ============
  const launcher = document.getElementById('atlas-launcher');
  const panel = document.getElementById('atlas-panel');
  const closeBtn = document.getElementById('atlas-close');
  const messages = document.getElementById('atlas-messages');
  const optionsEl = document.getElementById('atlas-options');
  const input = document.getElementById('atlas-input');
  const sendBtn = document.getElementById('atlas-send');

  if (!launcher || !panel) return;

  // ============ FAQ TREE ============
  const FAQ = {
    'what is interstellar': "Interstellar I.S. is an independent infrastructure broker. We help businesses source voice, network, security, cloud, mobility, and AI services from 503+ leading suppliers — without the bias of working for any one of them.",
    'who founded': "Marc Shamp — a U.S. veteran who built a payments business helping merchants stop overpaying, then turned the same lens on telecom and IT. He still answers the phone.",
    'veteran owned': "Yes. Interstellar I.S. is a veteran-owned LLC, founded and led by Marc Shamp.",
    'where located': "We're based in Aurora, Colorado — but we serve businesses nationally and globally.",
    'how long business': "Interstellar I.S. LLC was formed in 2022. The brokerage practice is built on multi-year operator relationships across payments, telecom, and IT.",
    'reseller or broker': "Broker. We don't carry inventory or resell. We source the right supplier for your need from a portfolio of 503+, then advocate for you for the life of the contract.",
    'do you charge fees': "No. We're paid by the suppliers when you procure through us. Our advisory costs you $0.",
    'what is i.s.': "Infrastructure Solutions. We architect connectivity, communications, security, and cloud — across every layer your business runs on.",
    'what services': "Seven categories: Voice & Collaboration, Contact Center, Network & Connectivity, Cybersecurity, Cloud & Data Center, Mobility & IoT, and AI & Customer Experience.",
    'how many suppliers': "503 and growing. Our supplier list expands as new technologies emerge — most recently AI and CX automation.",
    'work with my carrier': "Almost certainly. With 503 suppliers across 7 categories, we cover virtually every major carrier, cloud provider, and tech vendor in North America.",
    'multi site': "Yes. Whether you have 2 offices or 200 across multiple countries, we orchestrate connectivity, voice, and security across all of them under unified contracts where possible.",
    'cybersecurity too': "Absolutely. SASE, MDR, SSE, zero-trust, firewalls, identity — 78 cybersecurity suppliers in our portfolio.",
    'difference from carrier': "A carrier rep sells you their carrier. We compare 503 suppliers and recommend the best fit. Different incentive, different outcome.",
    'difference from broker': "Most brokers sell volume. We sell fit. Most brokers disappear after the contract signs. We stay through the lifecycle — renewals, escalations, expansion.",
    'save money': "Mid-market clients typically see 18–32% annual savings. Some see more, some see less. The free assessment tells you exactly what's possible for your situation.",
    'how assessment works': "30-minute call. We learn your current spend, contracts, pain points. Within 72 hours you get a side-by-side comparison of options. No commitment to switch.",
    'how long process': "Discovery: 30 min. Sourcing & quoting: ~72 hrs. Implementation depends on the project — anywhere from days (small VoIP) to months (multi-site SD-WAN).",
    'switch providers': "Not necessarily. Sometimes we renegotiate with your existing supplier. Sometimes we transition to a better fit. The assessment tells you which path is right.",
    'under contract': "We work around it. Often we time the transition to your renewal. Sometimes we find immediate value even mid-contract through restructuring.",
    'handle implementation': "Yes. We project-manage the rollout so you stay focused on operations. Order coordination, install scheduling, escalation management — all of it.",
    'something breaks': "We're your single point of escalation for the life of the contract. Outages, billing issues, change requests — call us, we handle it.",
    'sample quote': "Yes — share your current bill in the discovery call and we'll show you exactly what a side-by-side comparison looks like.",
    'obligated': "Nothing. The assessment is free, no obligation. If we can't save you money or improve your service, we say so honestly.",
    'cost me': "$0. We're compensated by suppliers, not clients.",
    'not ready switch': "That's fine. The assessment still has value — you'll know what your current arrangement is worth in the open market. Useful leverage at renewal time.",
    'too small': "We work with companies as small as a single office. SMB is one of our strongest practice areas — we treat it like enterprise, just at the right scale.",
    'government contracts': "We can support government-adjacent work, federal contractors, and SLED. For direct federal contracting we partner with appropriate set-aside firms.",
    'international': "Yes. Multi-country procurement with Tier-1 carrier orchestration is something we routinely handle for global enterprise clients.",
    'compliance': "We work with suppliers across HIPAA, PCI-DSS, SOC 2, GLBA, and FedRAMP-relevant categories. We're a broker, not the compliance auditor — but we route you to suppliers that meet your specific requirements."
  };

  const FAQ_KEYWORDS = {
    'what is interstellar': ['what is', 'what does', 'who are you', 'tell me about', 'explain'],
    'who founded': ['who founded', 'who owns', 'founder', 'who built', 'who runs'],
    'veteran owned': ['veteran', 'military', 'service'],
    'where located': ['where', 'location', 'address', 'office', 'based'],
    'how long business': ['how long', 'when started', 'when founded', 'years in business'],
    'reseller or broker': ['reseller', 'broker', 'agent', 'middleman', 'what kind of company'],
    'do you charge fees': ['fees', 'charge', 'cost', 'price', 'pricing', 'how much'],
    'what is i.s.': ['i.s.', 'i s', 'stand for', 'mean', 'abbreviation', 'acronym'],
    'what services': ['services', 'offer', 'provide', 'do you sell', 'what do you do'],
    'how many suppliers': ['how many suppliers', 'supplier count', 'how many vendors', 'portfolio size'],
    'work with my carrier': ['my carrier', 'work with', 'do you have', 'partner with', 'at&t', 'verizon', 'comcast', 'lumen', 'spectrum'],
    'multi site': ['multi site', 'multiple offices', 'multiple locations', 'global', 'international'],
    'cybersecurity too': ['cybersecurity', 'security', 'sase', 'mdr', 'firewall'],
    'difference from carrier': ['vs carrier', 'difference from carrier', 'why not direct', 'instead of carrier'],
    'difference from broker': ['other brokers', 'vs other', 'different from'],
    'save money': ['save money', 'savings', 'reduce cost', 'lower bill', 'cut cost'],
    'how assessment works': ['assessment', 'free analysis', 'audit', 'review my bill'],
    'how long process': ['how long', 'timeline', 'how fast', 'how quick'],
    'switch providers': ['switch', 'change provider', 'leave my current'],
    'under contract': ['under contract', 'contract', 'locked in', 'early termination'],
    'handle implementation': ['implementation', 'install', 'rollout', 'project manage', 'deploy'],
    'something breaks': ['support', 'after sale', 'something breaks', 'issue', 'help when'],
    'sample quote': ['sample', 'example quote', 'see a quote', 'demo'],
    'obligated': ['obligated', 'commitment', 'have to'],
    'cost me': ['cost me', 'pay you', 'how do you make money'],
    'not ready switch': ['not ready', 'just looking', 'just exploring'],
    'too small': ['small business', 'small company', 'too small', 'just starting'],
    'government contracts': ['government', 'federal', 'sled', 'state contract'],
    'international': ['international', 'global', 'overseas', 'multi country'],
    'compliance': ['hipaa', 'pci', 'soc 2', 'compliance', 'regulated', 'fedramp']
  };

  // ============ HELPERS ============
  function show(el) { el.style.display = ''; }
  function hide(el) { el.style.display = 'none'; }
  function scrollToBottom() { messages.scrollTop = messages.scrollHeight; }

  function addMessage(text, sender = 'bot') {
    const msg = document.createElement('div');
    msg.className = `atlas-msg atlas-msg-${sender}`;
    msg.textContent = text;
    messages.appendChild(msg);
    scrollToBottom();
  }

  function addRichMessage(html) {
    const msg = document.createElement('div');
    msg.className = 'atlas-msg atlas-msg-bot';
    msg.innerHTML = html;
    messages.appendChild(msg);
    scrollToBottom();
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'atlas-typing';
    t.id = 'atlas-typing-indicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(t);
    scrollToBottom();
  }

  function hideTyping() {
    const t = document.getElementById('atlas-typing-indicator');
    if (t) t.remove();
  }

  function setOptions(opts) {
    optionsEl.innerHTML = '';
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'atlas-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => opt.action(opt.label));
      optionsEl.appendChild(btn);
    });
  }

  function clearOptions() { optionsEl.innerHTML = ''; }

  function botSay(text, callback, delay = 600) {
    showTyping();
    setTimeout(() => {
      hideTyping();
      addMessage(text, 'bot');
      if (callback) callback();
    }, delay);
  }

  function botSayRich(html, callback, delay = 600) {
    showTyping();
    setTimeout(() => {
      hideTyping();
      addRichMessage(html);
      if (callback) callback();
    }, delay);
  }

  // ============ FAQ MATCHER ============
  function matchFAQ(text) {
    const t = text.toLowerCase();
    let bestKey = null;
    let bestScore = 0;
    for (const [key, keywords] of Object.entries(FAQ_KEYWORDS)) {
      for (const kw of keywords) {
        if (t.includes(kw)) {
          const score = kw.length;
          if (score > bestScore) {
            bestScore = score;
            bestKey = key;
          }
        }
      }
    }
    return bestKey ? FAQ[bestKey] : null;
  }

  // ============ CONVERSATION FLOW ============
  function start() {
    if (state.step !== 'opening') return;
    state.step = 'greeted';
    botSay("Hey — I'm Atlas. Interstellar I.S.'s AI guide. I can help you figure out what you actually need (and what you're probably overpaying for). Tell me what's on your mind, or pick one below.", () => {
      setOptions([
        { label: 'Cut my bill', action: () => handleQuickStart('bill_too_high') },
        { label: 'Voice / contact center', action: () => handleQuickStart('voice') },
        { label: 'Network & SD-WAN', action: () => handleQuickStart('network') },
        { label: 'Cybersecurity', action: () => handleQuickStart('security') },
        { label: 'Talk to a human', action: () => routeToTeam() }
      ]);
    }, 400);
  }

  function handleQuickStart(category) {
    const labels = {
      bill_too_high: 'Cut my bill',
      voice: 'Voice / contact center',
      network: 'Network & SD-WAN',
      security: 'Cybersecurity'
    };
    addMessage(labels[category], 'user');
    state.qualification.pain = category;
    clearOptions();
    askIndustry();
  }

  function askIndustry() {
    state.step = 'asking_industry';
    botSay("Got it. What does your business do? (One word is fine — healthcare, manufacturing, legal, retail, anything.)");
  }

  function askSize() {
    state.step = 'asking_size';
    botSay("Roughly how many people work there?", () => {
      setOptions([
        { label: '1–10', action: (l) => handleSize('1–10', l) },
        { label: '11–50', action: (l) => handleSize('11–50', l) },
        { label: '51–250', action: (l) => handleSize('51–250', l) },
        { label: '251–1000', action: (l) => handleSize('251–1000', l) },
        { label: '1000+', action: (l) => handleSize('1000+', l) }
      ]);
    });
  }

  function handleSize(size, label) {
    addMessage(label, 'user');
    state.qualification.size = size;
    clearOptions();
    if (state.qualification.pain) {
      askUrgency();
    } else {
      askPain();
    }
  }

  function askPain() {
    state.step = 'asking_pain';
    botSay("What's the main thing? (Pick the closest.)", () => {
      setOptions([
        { label: 'Bill is too high', action: (l) => handlePain('bill_too_high', l) },
        { label: 'Service is unreliable', action: (l) => handlePain('unreliable', l) },
        { label: 'Need new tech', action: (l) => handlePain('new_tech', l) },
        { label: 'Contract expiring', action: (l) => handlePain('contract_expiring', l) },
        { label: 'Just exploring', action: (l) => handlePain('exploring', l) }
      ]);
    });
  }

  function handlePain(pain, label) {
    addMessage(label, 'user');
    state.qualification.pain = pain;
    clearOptions();
    askUrgency();
  }

  function askUrgency() {
    state.step = 'asking_urgency';
    botSay("When do you need this fixed?", () => {
      setOptions([
        { label: 'This week', action: (l) => handleUrgency('this_week', l) },
        { label: 'This month', action: (l) => handleUrgency('this_month', l) },
        { label: 'This quarter', action: (l) => handleUrgency('this_quarter', l) },
        { label: 'No rush', action: (l) => handleUrgency('no_rush', l) }
      ]);
    });
  }

  function handleUrgency(urgency, label) {
    addMessage(label, 'user');
    state.qualification.urgency = urgency;
    clearOptions();
    deliverRecommendation();
  }

  function deliverRecommendation() {
    state.step = 'recommending';
    const q = state.qualification;
    const isHighValue = q.size === '1000+' || q.urgency === 'this_week' || q.pain === 'contract_expiring';

    const summary = `Got it. Based on what you said — ${q.size}-person ${q.industry || 'company'} with ${q.pain ? q.pain.replace(/_/g, ' ') : 'questions'}, on a ${q.urgency.replace(/_/g, ' ')} timeline — here's what I'd recommend: a 30-minute discovery call with our team. We canvas 503 suppliers, you see only the ones that fit, and you'll have a side-by-side comparison in 72 hours. Costs you nothing.`;

    botSay(summary, () => {
      const opts = [
        { label: 'Schedule it ↗', action: () => openBookings() },
        { label: 'Talk live now', action: () => routeToTeam() },
        { label: 'Just send me info', action: () => askEmail() }
      ];
      if (isHighValue) {
        opts.unshift({ label: 'Talk to the founder', action: () => routeToFounder() });
      }
      setOptions(opts);
    }, 800);
  }

  function openBookings() {
    addMessage('Schedule it', 'user');
    clearOptions();
    botSay("Opening MS Bookings in a new tab. Pick a time that works — we'll see you there.", () => {
      window.open(CONFIG.bookingsUrl, '_blank', 'noopener');
      setTimeout(() => {
        botSay("Anything else I can answer in the meantime?", () => {
          setOptions([
            { label: 'How does the call work?', action: () => answerFAQ('how assessment works') },
            { label: 'Is it really free?', action: () => answerFAQ('cost me') },
            { label: 'No, thanks', action: () => closeFlow() }
          ]);
        }, 800);
      }, 1500);
    });
  }

  function routeToTeam() {
    addMessage('Talk to a human', 'user');
    clearOptions();
    const ctx = encodeURIComponent(`Atlas qualified: industry=${state.qualification.industry || 'n/a'}, size=${state.qualification.size || 'n/a'}, pain=${state.qualification.pain || 'n/a'}, urgency=${state.qualification.urgency || 'n/a'}`);
    botSay("Connecting you with the Interstellar I.S. team now. Stay on this page — they'll respond in seconds.", () => {
      setTimeout(() => {
        window.open(`${CONFIG.teamChatUrl}?ctx=${ctx}`, '_blank', 'noopener');
      }, 1200);
    });
  }

  function routeToFounder() {
    addMessage('Talk to the founder', 'user');
    clearOptions();
    botSay("Sounds like your situation needs the principal. Routing you to Marc Shamp directly.", () => {
      setTimeout(() => {
        window.open(CONFIG.founderChatUrl, '_blank', 'noopener');
      }, 1200);
    });
  }

  function askEmail() {
    addMessage('Just send me info', 'user');
    state.step = 'collecting_email';
    clearOptions();
    botSay("Drop your email and I'll have someone send a quick recap with a few options for you to consider.");
  }

  function handleEmailCapture(email) {
    state.qualification.email = email;
    state.step = 'email_captured';
    botSay(`Got it — sending to ${email}. You'll hear from us within one business day. Anything else I can help with?`, () => {
      setOptions([
        { label: 'How do you make money?', action: () => answerFAQ('cost me') },
        { label: 'How long is the process?', action: () => answerFAQ('how long process') },
        { label: 'No, thanks', action: () => closeFlow() }
      ]);
    });
  }

  function answerFAQ(key) {
    const answer = FAQ[key];
    if (answer) {
      addMessage(key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '), 'user');
      clearOptions();
      botSay(answer, () => {
        setOptions([
          { label: 'Schedule a call ↗', action: () => openBookings() },
          { label: 'Talk live now', action: () => routeToTeam() },
          { label: 'Other questions', action: () => offerMoreQuestions() }
        ]);
      });
    }
  }

  function offerMoreQuestions() {
    addMessage('Other questions', 'user');
    clearOptions();
    botSay("Sure — what else?", () => {
      setOptions([
        { label: 'What does I.S. mean?', action: () => answerFAQ('what is i.s.') },
        { label: 'Are you really free?', action: () => answerFAQ('do you charge fees') },
        { label: 'Where are you based?', action: () => answerFAQ('where located') },
        { label: 'I\'m good — talk to team', action: () => routeToTeam() }
      ]);
    });
  }

  function closeFlow() {
    addMessage('No, thanks', 'user');
    clearOptions();
    botSay("Sounds good. We're here whenever you're ready — call (720) 735-8800 or schedule any time. Have a good one.");
    state.step = 'closed';
  }

  function handleFreeText(text) {
    addMessage(text, 'user');

    if (state.step === 'asking_industry') {
      state.qualification.industry = text;
      clearOptions();
      askSize();
      return;
    }

    if (state.step === 'collecting_email') {
      const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
      if (emailMatch) {
        handleEmailCapture(emailMatch[0]);
      } else {
        botSay("Hmm — that doesn't look like a valid email. Mind trying again?");
      }
      return;
    }

    // Try to match a FAQ
    const faq = matchFAQ(text);
    if (faq) {
      botSay(faq, () => {
        setOptions([
          { label: 'Schedule a call ↗', action: () => openBookings() },
          { label: 'Talk live now', action: () => routeToTeam() },
          { label: 'Other questions', action: () => offerMoreQuestions() }
        ]);
      });
      return;
    }

    // Fallback — escalate to team
    botSay("Good question — that's outside what I can answer reliably. Let me get you to a human who can.", () => {
      setOptions([
        { label: 'Connect to team', action: () => routeToTeam() },
        { label: 'Schedule instead', action: () => openBookings() },
        { label: 'Send me info via email', action: () => askEmail() }
      ]);
    });
  }

  // ============ EVENT WIRING ============
  function openPanel() {
    panel.classList.add('atlas-open');
    panel.setAttribute('aria-hidden', 'false');
    launcher.classList.add('atlas-hidden');
    if (state.step === 'opening') {
      setTimeout(start, 300);
    }
    setTimeout(() => input.focus(), 400);
  }

  function closePanel() {
    panel.classList.remove('atlas-open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.classList.remove('atlas-hidden');
  }

  launcher.addEventListener('click', openPanel);
  launcher.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPanel();
    }
  });
  closeBtn.addEventListener('click', closePanel);

  function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleFreeText(text);
  }
  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  });

  // ============ AUTO-OPEN AFTER DELAY (optional, disabled by default) ============
  // setTimeout(openPanel, 30000); // uncomment for 30s auto-prompt

})();
