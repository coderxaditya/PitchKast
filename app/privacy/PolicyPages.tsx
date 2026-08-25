"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("terms");

  useEffect(() => {
    // Force instant scroll to top to prevent the page from animating up from the footer
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 50);

    document.body.classList.remove("is-loading");

    const observer = new IntersectionObserver(
      (entries) => {
        let topMostEntry: IntersectionObserverEntry | null = null;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!topMostEntry || entry.boundingClientRect.top < topMostEntry.boundingClientRect.top) {
              topMostEntry = entry;
            }
          }
        });

        if (topMostEntry) {
          setActiveSection((topMostEntry as IntersectionObserverEntry).target.id);
        }
      },
      { 
        rootMargin: "-100px 0px -50% 0px",
        threshold: 0 
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const SidebarButton = ({ id, label }: { id: string, label: string }) => {
    const isActive = activeSection === id;
    return (
      <button 
        onClick={() => scrollTo(id)}
        className={`text-left text-sm font-semibold transition-colors w-full px-4 py-3 ${isActive ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans pb-32">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-red-600 font-bold text-2xl tracking-tighter uppercase">
            PITCHKAST
          </Link>
          <Link href="/" className="text-sm font-semibold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12 relative">
        <aside className="w-full md:w-1/4 shrink-0 hidden md:block relative">
          <div className="sticky top-32">
            <div className="w-12 h-1 bg-red-600 mb-4"></div>
            <div className="flex flex-col gap-1">
              <SidebarButton id="terms" label="Terms & Conditions" />
              <SidebarButton id="privacy" label="Privacy Policy" />
              <SidebarButton id="cookie" label="Cookie Policy" />
              <SidebarButton id="refund" label="Refund and Cancellation Policy" />
              <SidebarButton id="ip" label="Intellectual Property Policy" />
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4 max-w-4xl text-gray-800 text-[15px] leading-relaxed">
          
          <section id="terms" className="scroll-mt-32 mb-16">
            <h1 className="text-4xl font-bold mb-4 text-black tracking-tight">Terms & Conditions</h1>
            <p className="mb-4">Last Updated: 19 August 2026</p>
            <p className="mb-4">These Terms and Conditions govern your access to and use of the PitchKast website, services, platforms, content, products, and related offerings.</p>
            <p className="mb-4">By accessing our website, contacting us, booking a consultation, purchasing a service, signing a proposal, statement of work, order form, or otherwise engaging PitchKast, you agree to these Terms and Conditions.</p>
            <p className="mb-8">If you do not agree with these Terms, please do not use the website or engage our services.</p>

            <h3 className="text-xl font-bold mb-4 text-black">1. About PitchKast</h3>
            <p className="mb-4">PitchKast is a technology, branding, marketing, growth, and business services company.</p>
            <p className="mb-4">For purposes of these Terms, "PitchKast", "we", "us", and "our" refer to the PitchKast legal entity identified in the applicable proposal, invoice, agreement, order form, or other contracting document.</p>
            <p className="mb-4">"Client", "you", and "your" refer to the person or entity accessing our website or purchasing, receiving, or using our services.</p>
            <p className="mb-8">Where a specific written agreement, proposal, statement of work, order form, or master services agreement has been executed between PitchKast and a Client, that document will govern the relevant engagement to the extent of any inconsistency with these Terms.</p>

            <h3 className="text-xl font-bold mb-4 text-black">2. Scope of Services</h3>
            <p className="mb-4">PitchKast may provide services including, but not limited to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Technology consulting</li>
              <li>Website development</li>
              <li>Software and application development</li>
              <li>Product development</li>
              <li>UI/UX design</li>
              <li>Branding and visual identity</li>
              <li>Pitch decks and business presentations</li>
              <li>Founder branding</li>
              <li>LinkedIn management</li>
              <li>Social media management</li>
              <li>Content strategy</li>
              <li>Content writing</li>
              <li>SEO</li>
              <li>Digital marketing</li>
              <li>Lead generation</li>
              <li>Business development</li>
              <li>Outreach</li>
              <li>Investor relations support</li>
              <li>Fundraising support</li>
              <li>Business strategy</li>
              <li>Market research</li>
              <li>Training and consulting</li>
              <li>Other services specifically agreed in writing</li>
            </ul>
            <p className="mb-8">The exact services, deliverables, timelines, fees, responsibilities, and assumptions applicable to a Client will be defined in the relevant proposal, statement of work, order form, or agreement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">3. No Automatic Service Relationship</h3>
            <p className="mb-4">Browsing the website, submitting an enquiry, booking a call, downloading material, or communicating with PitchKast does not automatically create a client relationship.</p>
            <p className="mb-8">A binding commercial engagement begins only when the applicable proposal, agreement, order form, statement of work, or other written confirmation is accepted by both parties or when PitchKast begins work following an agreed commercial arrangement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">4. Proposals and Statements of Work</h3>
            <p className="mb-4">Proposals and statements of work may specify:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Scope of services</li>
              <li>Deliverables</li>
              <li>Fees</li>
              <li>Payment schedule</li>
              <li>Project duration</li>
              <li>Revision limits</li>
              <li>Client responsibilities</li>
              <li>Third-party costs</li>
              <li>Dependencies</li>
              <li>Milestones</li>
              <li>Acceptance criteria</li>
              <li>Termination provisions</li>
            </ul>
            <p className="mb-8">A proposal is valid only for the period stated in it. If no validity period is specified, PitchKast may withdraw or modify the proposal at any time before acceptance.</p>

            <h3 className="text-xl font-bold mb-4 text-black">5. Client Responsibilities</h3>
            <p className="mb-4">The Client agrees to provide accurate, complete, and timely information reasonably required to perform the services.</p>
            <p className="mb-4">The Client is responsible for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing necessary content and information</li>
              <li>Providing access to relevant accounts and platforms</li>
              <li>Providing accurate business information</li>
              <li>Reviewing and approving deliverables</li>
              <li>Providing timely feedback</li>
              <li>Obtaining necessary permissions and licences</li>
              <li>Ensuring that supplied material does not infringe third-party rights</li>
              <li>Making payments when due</li>
              <li>Maintaining access to accounts controlled by the Client</li>
            </ul>
            <p className="mb-8">Delays caused by missing information, delayed approvals, unavailable personnel, restricted accounts, platform issues, or other Client dependencies may affect delivery timelines.</p>

            <h3 className="text-xl font-bold mb-4 text-black">6. Client Materials</h3>
            <p className="mb-4">The Client retains ownership of materials supplied to PitchKast unless otherwise agreed in writing.</p>
            <p className="mb-4">The Client grants PitchKast a limited, non-exclusive licence to use, reproduce, modify, store, and process those materials solely to provide the contracted services.</p>
            <p className="mb-8">The Client represents that it has the necessary rights and permissions to provide such materials.</p>

            <h3 className="text-xl font-bold mb-4 text-black">7. Intellectual Property</h3>
            <p className="mb-4">Unless otherwise stated in the applicable agreement:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Upon full payment of all amounts due for a specific deliverable, the Client will receive the rights expressly assigned to it under the applicable agreement.</li>
            </ul>
            <p className="mb-4">PitchKast retains ownership of:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Pre-existing intellectual property</li>
              <li>Internal processes</li>
              <li>Frameworks</li>
              <li>Templates</li>
              <li>Methodologies</li>
              <li>Know-how</li>
              <li>Internal tools</li>
              <li>Reusable systems</li>
              <li>General concepts and techniques</li>
              <li>Software components not specifically assigned to the Client</li>
              <li>Internal documentation</li>
            </ul>
            <p className="mb-4">Payment for a service does not automatically transfer PitchKast's pre-existing intellectual property.</p>
            <p className="mb-8">Third-party software, fonts, stock assets, APIs, plugins, libraries, platforms, and other third-party materials remain subject to their respective licences.</p>

            <h3 className="text-xl font-bold mb-4 text-black">8. Website and Software Development</h3>
            <p className="mb-4">Where PitchKast develops software, websites, applications, or technical systems:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The final scope will be determined by the applicable agreement.</li>
              <li>Additional functionality requested after approval of the scope may constitute additional work and may require additional fees and time.</li>
              <li>Third-party services may include hosting providers, domain registrars, payment processors, APIs, cloud services, analytics systems, email providers, messaging providers, and other platforms.</li>
            </ul>
            <p className="mb-8">PitchKast is not responsible for outages, policy changes, pricing changes, API changes, account suspensions, security incidents, or service interruptions caused by third-party providers.</p>

            <h3 className="text-xl font-bold mb-4 text-black">9. Marketing and Growth Services</h3>
            <p className="mb-4">Marketing services are dependent on multiple factors outside PitchKast's control.</p>
            <p className="mb-4">PitchKast does not guarantee:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>A specific number of leads</li>
              <li>Revenue</li>
              <li>Sales</li>
              <li>Followers</li>
              <li>Impressions</li>
              <li>Engagement</li>
              <li>Search rankings</li>
              <li>Advertising performance</li>
              <li>Investor interest</li>
              <li>Funding</li>
              <li>Partnership outcomes</li>
              <li>Conversion rates</li>
            </ul>
            <p className="mb-8">Any historical results, case studies, testimonials, projections, or examples shown on our website represent specific engagements and should not be interpreted as guaranteed future results.</p>

            <h3 className="text-xl font-bold mb-4 text-black">10. Lead Generation and Outreach</h3>
            <p className="mb-4">Where PitchKast provides lead generation or outreach services, the Client acknowledges that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Prospects may not respond</li>
              <li>Prospects may reject an offer</li>
              <li>Contact information may become outdated</li>
              <li>Platforms may restrict accounts</li>
              <li>Outreach rules may change</li>
              <li>Third-party platforms may impose limits</li>
              <li>Sales outcomes depend on the Client's offer, pricing, sales process, market, and other factors</li>
            </ul>
            <p className="mb-4">PitchKast will use commercially reasonable efforts to perform the agreed services but does not guarantee revenue or closed business.</p>
            <p className="mb-8">The Client is responsible for ensuring that its products, services, claims, offers, and sales practices comply with applicable law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">11. SEO Services</h3>
            <p className="mb-4">SEO results depend on search engine algorithms, competition, website quality, technical factors, content, backlinks, market conditions, and other variables.</p>
            <p className="mb-4">PitchKast does not guarantee:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>First-page rankings</li>
              <li>Number-one rankings</li>
              <li>Specific keywords</li>
              <li>Specific traffic levels</li>
              <li>Specific leads</li>
              <li>Specific revenue</li>
            </ul>
            <p className="mb-8">Search engines may change their algorithms without notice.</p>

            <h3 className="text-xl font-bold mb-4 text-black">12. Social Media Services</h3>
            <p className="mb-4">Social media services are subject to the rules and technical limitations of third-party platforms.</p>
            <p className="mb-4">PitchKast does not control third-party platforms and cannot guarantee uninterrupted access, reach, visibility, engagement, or account availability.</p>
            <p className="mb-8">If a social media platform suspends, restricts, limits, or removes an account, PitchKast will reasonably assist with available recovery or appeal processes but does not guarantee restoration.</p>

            <h3 className="text-xl font-bold mb-4 text-black">13. Content and Approvals</h3>
            <p className="mb-4">Unless otherwise agreed, the Client is responsible for reviewing content before final publication where approval is required.</p>
            <p className="mb-4">Once content has been approved by the Client, PitchKast may publish or distribute it according to the agreed strategy.</p>
            <p className="mb-8">The Client remains responsible for the factual accuracy of business-specific claims supplied or approved by the Client.</p>

            <h3 className="text-xl font-bold mb-4 text-black">14. Revisions</h3>
            <p className="mb-4">Revision limits, approval rounds, and turnaround times will be specified in the applicable proposal or statement of work.</p>
            <p className="mb-4">Requests outside the agreed scope may be treated as additional work.</p>
            <p className="mb-8">Repeated changes resulting from changes in direction after approval may also constitute additional work.</p>

            <h3 className="text-xl font-bold mb-4 text-black">15. Third-Party Services</h3>
            <p className="mb-4">PitchKast may use third-party platforms and providers to deliver services.</p>
            <p className="mb-4">These may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Hosting providers</li>
              <li>Cloud infrastructure</li>
              <li>Analytics providers</li>
              <li>CRM systems</li>
              <li>Email platforms</li>
              <li>Payment processors</li>
              <li>Social media platforms</li>
              <li>Advertising platforms</li>
              <li>AI tools</li>
              <li>Design platforms</li>
              <li>Communication tools</li>
              <li>Project management platforms</li>
              <li>Domain providers</li>
              <li>Software libraries and APIs</li>
            </ul>
            <p className="mb-8">The Client agrees to comply with the applicable terms of those third-party services.</p>

            <h3 className="text-xl font-bold mb-4 text-black">16. AI and Automated Tools</h3>
            <p className="mb-4">PitchKast may use artificial intelligence and automated tools where appropriate for research, ideation, drafting, analysis, development, design, workflow automation, or other business purposes.</p>
            <p className="mb-4">Where AI tools are used, PitchKast will use reasonable care in reviewing outputs.</p>
            <p className="mb-4">AI-generated or AI-assisted output may contain errors and should not automatically be treated as fact, legal advice, financial advice, medical advice, or professional advice.</p>
            <p className="mb-8">The Client remains responsible for reviewing and approving final business-specific claims and materials.</p>

            <h3 className="text-xl font-bold mb-4 text-black">17. Payments</h3>
            <p className="mb-4">Fees, payment schedules, taxes, payment methods, and other commercial terms will be specified in the applicable proposal or agreement.</p>
            <p className="mb-4">Unless otherwise agreed:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Invoices are payable by the stated due date.</li>
              <li>Work may be paused where invoices remain unpaid.</li>
              <li>Delayed payments may affect delivery timelines.</li>
              <li>Taxes and applicable government charges are payable by the Client unless expressly included.</li>
              <li>Third-party costs are not included unless expressly stated.</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">18. Late Payments</h3>
            <p className="mb-4">If payment is not received by the due date, PitchKast may:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Pause services</li>
              <li>Restrict access to deliverables</li>
              <li>Delay further work</li>
              <li>Suspend accounts or project activity where contractually permitted</li>
              <li>Charge applicable late fees where agreed</li>
              <li>Recover reasonable collection costs where legally permitted</li>
              <li>Terminate the engagement after providing any notice required by the agreement</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">19. Refunds</h3>
            <p className="mb-4">Refund rights will be governed by the applicable proposal or agreement.</p>
            <p className="mb-4">Unless expressly agreed otherwise, fees for work already performed, approved deliverables, third-party expenses, completed milestones, or committed resources are non-refundable.</p>
            <p className="mb-4">A refund will not automatically be available merely because a Client changes its mind, changes business direction, does not use a deliverable, or does not achieve a desired commercial outcome.</p>
            <p className="mb-8">Nothing in this clause excludes any mandatory consumer rights or other rights that cannot legally be waived.</p>

            <h3 className="text-xl font-bold mb-4 text-black">20. Cancellation and Termination</h3>
            <p className="mb-4">Either party may terminate an engagement according to the termination terms in the applicable agreement.</p>
            <p className="mb-4">Where no specific termination provision exists, either party may request termination by providing written notice.</p>
            <p className="mb-4">Upon termination:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>The Client remains responsible for fees already earned.</li>
              <li>Approved work completed before termination remains payable.</li>
              <li>Non-cancellable third-party costs remain payable.</li>
              <li>Outstanding invoices become due according to the agreement.</li>
              <li>Confidentiality obligations continue.</li>
              <li>Intellectual property rights will be determined according to payment status and the applicable agreement.</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">21. Suspension</h3>
            <p className="mb-4">PitchKast may suspend services where:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Payments are overdue</li>
              <li>The Client provides unlawful instructions</li>
              <li>The Client requests work that violates applicable law</li>
              <li>The Client materially breaches the agreement</li>
              <li>Required account access is unavailable</li>
              <li>Continuing the work creates a material security or legal risk</li>
              <li>A third-party platform prevents performance</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">22. Confidentiality</h3>
            <p className="mb-4">Each party agrees to protect confidential information received from the other party.</p>
            <p className="mb-4">Confidential information includes non-public:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Business information</li>
              <li>Financial information</li>
              <li>Customer information</li>
              <li>Product information</li>
              <li>Technical information</li>
              <li>Strategies</li>
              <li>Credentials</li>
              <li>Commercial terms</li>
              <li>Marketing plans</li>
              <li>Investor information</li>
              <li>Internal documents</li>
            </ul>
            <p className="mb-4">Confidential information may be disclosed where required by law, court order, regulatory authority, or where reasonably necessary to professional advisers or service providers bound by appropriate confidentiality obligations.</p>
            <p className="mb-8">Confidentiality obligations survive termination of the engagement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">23. Account Credentials</h3>
            <p className="mb-4">Where the Client provides passwords, API keys, access tokens, administrative access, or other credentials, PitchKast will use them only for authorised purposes.</p>
            <p className="mb-4">Clients should use appropriate security practices and should revoke access when an engagement ends where appropriate.</p>
            <p className="mb-8">PitchKast will not knowingly sell Client credentials or intentionally disclose them to unauthorised parties.</p>

            <h3 className="text-xl font-bold mb-4 text-black">24. Security</h3>
            <p className="mb-4">PitchKast will use reasonable administrative and technical safeguards appropriate to the nature of information processed.</p>
            <p className="mb-4">However, no internet transmission, cloud service, software system, or electronic storage system can be guaranteed to be completely secure.</p>
            <p className="mb-8">The Client acknowledges this inherent risk.</p>

            <h3 className="text-xl font-bold mb-4 text-black">25. Data Protection</h3>
            <p className="mb-4">PitchKast may process personal data in connection with its website, enquiries, communications, client engagements, recruitment, marketing, billing, and service delivery.</p>
            <p className="mb-4">Such processing will be governed by our Privacy Policy and applicable data protection laws.</p>
            <p className="mb-8">Where applicable, PitchKast will comply with the Digital Personal Data Protection Act, 2023 and applicable rules and commencement provisions. (<a href="https://www.indiacode.nic.in/handle/123456789/22037?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">India Code</a>)</p>

            <h3 className="text-xl font-bold mb-4 text-black">26. Compliance With Law</h3>
            <p className="mb-4">The Client must not use PitchKast services for unlawful activity.</p>
            <p className="mb-4">The Client must not request PitchKast to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create fraudulent material</li>
              <li>Misrepresent information</li>
              <li>Impersonate individuals</li>
              <li>Infringe intellectual property</li>
              <li>Conduct unlawful surveillance</li>
              <li>Circumvent security controls</li>
              <li>Violate applicable advertising rules</li>
              <li>Conduct unlawful spam</li>
              <li>Facilitate financial crime</li>
              <li>Violate privacy rights</li>
              <li>Violate applicable platform rules</li>
            </ul>
            <p className="mb-8">PitchKast may refuse or terminate work that it reasonably believes would violate applicable law or platform policies.</p>

            <h3 className="text-xl font-bold mb-4 text-black">27. User Conduct</h3>
            <p className="mb-4">Users must not:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Attempt unauthorised access</li>
              <li>Interfere with website operation</li>
              <li>Introduce malware</li>
              <li>Scrape the website without permission</li>
              <li>Reverse engineer protected systems</li>
              <li>Copy proprietary materials</li>
              <li>Abuse contact forms</li>
              <li>Submit misleading information</li>
              <li>Attempt to disrupt services</li>
              <li>Use the website for unlawful purposes</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">28. Website Content</h3>
            <p className="mb-4">Website content is provided for general informational purposes.</p>
            <p className="mb-4">We try to keep information accurate and current, but we do not guarantee that every website statement is complete, current, or error-free.</p>
            <p className="mb-8">Information may change without notice.</p>

            <h3 className="text-xl font-bold mb-4 text-black">29. No Professional Advice</h3>
            <p className="mb-4">Unless expressly agreed in writing, PitchKast services do not constitute:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Legal advice</li>
              <li>Tax advice</li>
              <li>Accounting advice</li>
              <li>Investment advice</li>
              <li>Financial advice</li>
              <li>Medical advice</li>
              <li>Regulatory advice</li>
            </ul>
            <p className="mb-8">Clients should obtain advice from appropriately qualified professionals where necessary.</p>

            <h3 className="text-xl font-bold mb-4 text-black">30. Third-Party Links</h3>
            <p className="mb-4">The website may contain links to third-party websites.</p>
            <p className="mb-4">PitchKast does not control those websites and is not responsible for their:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Content</li>
              <li>Privacy practices</li>
              <li>Security</li>
              <li>Availability</li>
              <li>Terms</li>
              <li>Products</li>
              <li>Services</li>
            </ul>
            <p className="mb-8">Accessing third-party websites is at your own risk.</p>

            <h3 className="text-xl font-bold mb-4 text-black">31. Testimonials and Case Studies</h3>
            <p className="mb-4">Testimonials and case studies may describe specific client experiences.</p>
            <p className="mb-4">Results differ between clients.</p>
            <p className="mb-8">Unless expressly authorised in writing, PitchKast will not publicly identify a client, publish confidential information, display private account information, or quote confidential performance figures as a marketing case study.</p>

            <h3 className="text-xl font-bold mb-4 text-black">32. Portfolio Rights</h3>
            <p className="mb-4">PitchKast may display publicly available work, general capabilities, or non-confidential materials in its portfolio unless otherwise restricted by written agreement.</p>
            <p className="mb-8">Any confidential or identifying Client information will be handled according to the applicable agreement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">33. Intellectual Property Infringement Claims</h3>
            <p className="mb-4">If you believe content hosted by PitchKast infringes your intellectual property rights, contact us with:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your name</li>
              <li>Contact information</li>
              <li>Identification of the protected work</li>
              <li>Location of the allegedly infringing material</li>
              <li>Explanation of the alleged infringement</li>
              <li>Confirmation that the information provided is accurate</li>
            </ul>
            <p className="mb-8">We may investigate and take appropriate action.</p>

            <h3 className="text-xl font-bold mb-4 text-black">34. Indemnification</h3>
            <p className="mb-4">To the extent permitted by law, the Client agrees to indemnify and hold harmless PitchKast, its directors, officers, employees, contractors, and representatives from claims, losses, damages, liabilities, costs, and expenses arising from:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Client-provided materials</li>
              <li>Client's unlawful conduct</li>
              <li>Client's breach of these Terms</li>
              <li>Client's infringement of third-party rights</li>
              <li>Client's products or services</li>
              <li>False or misleading information supplied by the Client</li>
              <li>Client's misuse of third-party platforms</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">35. Disclaimer of Warranties</h3>
            <p className="mb-4">To the maximum extent permitted by law, the website and services are provided on an "as available" basis.</p>
            <p className="mb-4">PitchKast does not warrant that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The website will always be available</li>
              <li>Services will always be uninterrupted</li>
              <li>Results will meet specific expectations</li>
              <li>Third-party platforms will remain available</li>
              <li>Software will always be error-free</li>
              <li>Marketing outcomes will be achieved</li>
              <li>Search rankings will remain stable</li>
            </ul>
            <p className="mb-8">Mandatory warranties and statutory rights that cannot legally be excluded remain unaffected.</p>

            <h3 className="text-xl font-bold mb-4 text-black">36. Limitation of Liability</h3>
            <p className="mb-4">To the maximum extent permitted by law, PitchKast will not be liable for indirect, incidental, special, consequential, punitive, or loss-of-profit damages arising from an engagement.</p>
            <p className="mb-4">Where legally permissible, PitchKast's aggregate liability arising from a specific engagement will not exceed the total fees actually paid by the Client to PitchKast for that engagement during the applicable twelve-month period preceding the event giving rise to the claim.</p>
            <p className="mb-8">This limitation does not apply to liability that cannot legally be limited or excluded.</p>

            <h3 className="text-xl font-bold mb-4 text-black">37. Force Majeure</h3>
            <p className="mb-4">PitchKast will not be responsible for failure or delay caused by events outside its reasonable control, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Natural disasters</li>
              <li>War</li>
              <li>Terrorism</li>
              <li>Government action</li>
              <li>Internet outages</li>
              <li>Cloud outages</li>
              <li>Platform outages</li>
              <li>Cyberattacks</li>
              <li>Labour disputes</li>
              <li>Epidemics</li>
              <li>Power failures</li>
              <li>Telecommunications failures</li>
              <li>Changes in law</li>
              <li>Third-party service failures</li>
            </ul>
            <p className="mb-8">The affected party will make reasonable efforts to minimise the impact.</p>

            <h3 className="text-xl font-bold mb-4 text-black">38. Non-Solicitation</h3>
            <p className="mb-4">Unless otherwise agreed, during an active engagement and for twelve months thereafter, neither party will knowingly solicit for direct employment a dedicated employee of the other party who was materially involved in the engagement.</p>
            <p className="mb-8">This clause does not prohibit general job advertisements or applications made independently of targeted solicitation.</p>

            <h3 className="text-xl font-bold mb-4 text-black">39. Independent Contractor</h3>
            <p className="mb-4">PitchKast acts as an independent contractor.</p>
            <p className="mb-4">Nothing in these Terms creates:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>An employment relationship</li>
              <li>Partnership</li>
              <li>Joint venture</li>
              <li>Agency relationship</li>
              <li>Fiduciary relationship</li>
            </ul>
            <p className="mb-8">unless expressly agreed in writing.</p>

            <h3 className="text-xl font-bold mb-4 text-black">40. Assignment</h3>
            <p className="mb-4">The Client may not transfer its rights or obligations under an agreement without PitchKast's written consent, except where permitted by applicable law.</p>
            <p className="mb-8">PitchKast may assign an agreement to an affiliate, successor, or entity involved in a merger, restructuring, or sale of substantially all relevant business assets.</p>

            <h3 className="text-xl font-bold mb-4 text-black">41. Changes to Services</h3>
            <p className="mb-4">PitchKast may modify or discontinue website features, informational content, or non-contractual services.</p>
            <p className="mb-8">Material changes to contracted services will be governed by the applicable agreement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">42. Changes to These Terms</h3>
            <p className="mb-4">We may update these Terms from time to time.</p>
            <p className="mb-4">The updated version will be published on this website with a revised "Last Updated" date.</p>
            <p className="mb-8">Where legally required, material changes will be communicated through appropriate means.</p>

            <h3 className="text-xl font-bold mb-4 text-black">43. Governing Law</h3>
            <p className="mb-8">These Terms will be governed by the laws of India unless the applicable Client agreement expressly provides otherwise.</p>

            <h3 className="text-xl font-bold mb-4 text-black">44. Jurisdiction</h3>
            <p className="mb-4">Subject to any mandatory applicable law and the dispute-resolution provisions of the applicable agreement, courts having jurisdiction at the agreed PitchKast contracting location in India will have jurisdiction.</p>
            <p className="mb-8">The exact jurisdiction should be inserted once PitchKast confirms its legal entity and registered office.</p>

            <h3 className="text-xl font-bold mb-4 text-black">45. Dispute Resolution</h3>
            <p className="mb-4">The parties will first attempt to resolve disputes through good-faith discussions.</p>
            <p className="mb-4">Where the applicable agreement contains an arbitration clause, that clause will govern.</p>
            <p className="mb-8">If no arbitration clause exists, disputes will be subject to the jurisdiction specified above, subject to applicable law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">46. Severability</h3>
            <p className="mb-8">If any provision is held invalid or unenforceable, the remaining provisions will continue in effect.</p>

            <h3 className="text-xl font-bold mb-4 text-black">47. Waiver</h3>
            <p className="mb-8">Failure to enforce any provision does not constitute a waiver of the right to enforce that provision later.</p>

            <h3 className="text-xl font-bold mb-4 text-black">48. Entire Agreement</h3>
            <p className="mb-8">The applicable proposal, statement of work, order form, master agreement, these Terms, and any incorporated policies constitute the agreement between PitchKast and the Client concerning the relevant services.</p>

            <h3 className="text-xl font-bold mb-4 text-black">49. Electronic Acceptance</h3>
            <p className="mb-8">Electronic acceptance, email approval, digital signature, payment, or commencement of work may constitute acceptance of the applicable commercial terms to the extent permitted by law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">50. Contact</h3>
            <p className="mb-4">For legal or contractual questions:</p>
            <p className="mb-4">PitchKast</p>
            <p className="mb-4">Legal Entity: [INSERT LEGAL ENTITY]</p>
            <p className="mb-4">Registered Address: [INSERT ADDRESS]</p>
            <p className="mb-4">Email: [INSERT LEGAL EMAIL]</p>
            <p className="mb-8">Website: <a href="https://pitchkast.com/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">pitchkast.com</a></p>
          </section>

          <div className="w-full h-px bg-gray-200 my-16"></div>

          <section id="privacy" className="scroll-mt-32 mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">Privacy Policy</h2>
            <p className="mb-4">Last Updated: 19 August 2026</p>
            <p className="mb-8">This Privacy Policy explains how PitchKast collects, uses, stores, shares, and protects personal information when you visit our website, contact us, use our services, apply for a role, or otherwise interact with us.</p>

            <h3 className="text-xl font-bold mb-4 text-black">1. Who We Are</h3>
            <p className="mb-4">For purposes of this Privacy Policy, "PitchKast", "we", "us", and "our" refer to the PitchKast legal entity responsible for the relevant processing.</p>
            <p className="mb-4">Legal Entity: [INSERT LEGAL ENTITY]</p>
            <p className="mb-4">Registered Address: [INSERT ADDRESS]</p>
            <p className="mb-8">Privacy Contact: [INSERT PRIVACY EMAIL]</p>

            <h3 className="text-xl font-bold mb-4 text-black">2. Scope</h3>
            <p className="mb-4">This Privacy Policy applies to information collected through:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Our website</li>
              <li>Contact forms</li>
              <li>Strategy call forms</li>
              <li>Email</li>
              <li>Phone</li>
              <li>WhatsApp or other messaging channels</li>
              <li>Social media interactions</li>
              <li>Client onboarding</li>
              <li>Service delivery</li>
              <li>Recruitment</li>
              <li>Events</li>
              <li>Marketing campaigns</li>
              <li>Other interactions with PitchKast</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">3. Information We Collect</h3>
            <p className="mb-4">Depending on how you interact with us, we may collect:</p>
            <p className="mb-4 font-bold">Identity Information</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name</li>
              <li>Job title</li>
              <li>Company</li>
              <li>Professional profile</li>
              <li>Country</li>
              <li>Business information</li>
            </ul>
            <p className="mb-4 font-bold">Contact Information</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business address</li>
              <li>Social media handles</li>
            </ul>
            <p className="mb-4 font-bold">Enquiry Information</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Services you are interested in</li>
              <li>Budget range</li>
              <li>Business requirements</li>
              <li>Project details</li>
              <li>Information submitted through forms</li>
            </ul>
            <p className="mb-4 font-bold">Client Information</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Contracts</li>
              <li>Project information</li>
              <li>Business documents</li>
              <li>Brand assets</li>
              <li>Account information</li>
              <li>Content</li>
              <li>Communications</li>
              <li>Feedback</li>
              <li>Approvals</li>
            </ul>
            <p className="mb-4 font-bold">Technical Information</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Referring pages</li>
              <li>Approximate location</li>
              <li>Date and time of access</li>
              <li>Website interaction data</li>
            </ul>
            <p className="mb-4 font-bold">Payment Information</p>
            <p className="mb-4">Payments may be processed through third-party payment providers.</p>
            <p className="mb-4">PitchKast generally does not need to store complete payment card details where the payment provider processes them directly.</p>
            <p className="mb-8">Payment providers may collect and process payment information according to their own privacy policies.</p>

            <h3 className="text-xl font-bold mb-4 text-black">4. How We Collect Information</h3>
            <p className="mb-4">We may collect information:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Directly from you</li>
              <li>Through forms</li>
              <li>During calls</li>
              <li>Through email</li>
              <li>Through messaging platforms</li>
              <li>Through website technologies</li>
              <li>From publicly available professional sources</li>
              <li>From referrals</li>
              <li>From service providers</li>
              <li>From Client representatives</li>
              <li>From recruitment applications</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">5. Why We Use Personal Data</h3>
            <p className="mb-4">We may process personal data to:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Respond to enquiries</li>
              <li>Schedule calls</li>
              <li>Provide services</li>
              <li>Prepare proposals</li>
              <li>Manage Client relationships</li>
              <li>Communicate with Clients</li>
              <li>Process payments</li>
              <li>Send invoices</li>
              <li>Deliver projects</li>
              <li>Provide customer support</li>
              <li>Improve our services</li>
              <li>Analyse website performance</li>
              <li>Maintain security</li>
              <li>Prevent fraud and abuse</li>
              <li>Recruit employees and contractors</li>
              <li>Conduct business operations</li>
              <li>Send marketing communications where permitted</li>
              <li>Comply with legal obligations</li>
              <li>Protect our legal rights</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">6. Legal Basis</h3>
            <p className="mb-4">Where applicable, personal data may be processed based on:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Consent</li>
              <li>Performance of a contract</li>
              <li>Steps taken before entering into a contract</li>
              <li>Compliance with legal obligations</li>
              <li>Legitimate or lawful business purposes where permitted</li>
              <li>Other lawful grounds recognised by applicable law</li>
            </ul>
            <p className="mb-8">India's DPDP framework provides for grounds for processing, notice, consent, certain legitimate uses, security obligations, access, correction, erasure, and grievance redressal. (<a href="https://www.indiacode.nic.in/handle/123456789/22037?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">India Code</a>)</p>

            <h3 className="text-xl font-bold mb-4 text-black">7. Consent</h3>
            <p className="mb-4">Where consent is required, we will seek consent in an appropriate manner.</p>
            <p className="mb-4">You may withdraw consent where applicable.</p>
            <p className="mb-4">Withdrawal of consent does not invalidate processing lawfully carried out before withdrawal.</p>
            <p className="mb-8">Withdrawal may also affect our ability to provide services where the relevant processing is necessary for those services.</p>

            <h3 className="text-xl font-bold mb-4 text-black">8. Marketing Communications</h3>
            <p className="mb-4">We may send business communications, newsletters, service updates, offers, or other marketing messages where permitted.</p>
            <p className="mb-4">You may opt out of marketing communications using the unsubscribe mechanism or by contacting us.</p>
            <p className="mb-8">Transactional and service-related communications may continue where necessary.</p>

            <h3 className="text-xl font-bold mb-4 text-black">9. Cookies</h3>
            <p className="mb-4">Our website may use cookies and similar technologies.</p>
            <p className="mb-4">These technologies may be used for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Website functionality</li>
              <li>Security</li>
              <li>Analytics</li>
              <li>Performance measurement</li>
              <li>Remembering preferences</li>
              <li>Understanding website usage</li>
              <li>Marketing where applicable</li>
            </ul>
            <p className="mb-4">You may control cookies through your browser settings.</p>
            <p className="mb-8">Disabling certain cookies may affect website functionality.</p>

            <h3 className="text-xl font-bold mb-4 text-black">10. Analytics</h3>
            <p className="mb-4">We may use analytics tools to understand how visitors use our website.</p>
            <p className="mb-4">These tools may collect information such as:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Pages visited</li>
              <li>Time spent</li>
              <li>Device type</li>
              <li>Browser</li>
              <li>Approximate geographic information</li>
              <li>Traffic source</li>
              <li>Interaction data</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">11. Third-Party Service Providers</h3>
            <p className="mb-4">We may share information with service providers that help us operate our business.</p>
            <p className="mb-4">These may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Hosting providers</li>
              <li>Cloud providers</li>
              <li>CRM systems</li>
              <li>Analytics providers</li>
              <li>Email providers</li>
              <li>Payment processors</li>
              <li>Scheduling tools</li>
              <li>Communication platforms</li>
              <li>Project management systems</li>
              <li>Marketing platforms</li>
              <li>Security providers</li>
              <li>AI service providers</li>
              <li>Professional advisers</li>
            </ul>
            <p className="mb-8">These providers receive information only to the extent reasonably necessary for the relevant purpose.</p>

            <h3 className="text-xl font-bold mb-4 text-black">12. AI Service Providers</h3>
            <p className="mb-4">Where AI tools are used to support our services or business operations, information may be processed by the relevant AI provider.</p>
            <p className="mb-4">We will take reasonable steps to use appropriate providers and configurations.</p>
            <p className="mb-4">Clients should not provide highly sensitive or unnecessary personal information unless it is required for the agreed service.</p>
            <p className="mb-8">Where processing of Client data by an AI provider is material to a service, the applicable agreement may contain additional requirements.</p>

            <h3 className="text-xl font-bold mb-4 text-black">13. Social Media Platforms</h3>
            <p className="mb-4">If you interact with PitchKast through LinkedIn, Instagram, Facebook, X, YouTube, or other platforms, those platforms may independently collect and process information.</p>
            <p className="mb-8">Their privacy policies apply to their processing.</p>

            <h3 className="text-xl font-bold mb-4 text-black">14. Lead Generation Data</h3>
            <p className="mb-4">Where PitchKast provides lead generation services, we may process professional contact information such as:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name</li>
              <li>Job title</li>
              <li>Company</li>
              <li>Business email</li>
              <li>Professional profile</li>
              <li>Public business information</li>
            </ul>
            <p className="mb-4">Such processing will be conducted in accordance with applicable law and relevant platform rules.</p>
            <p className="mb-8">We do not intend to collect unnecessary sensitive personal information for ordinary B2B prospecting.</p>

            <h3 className="text-xl font-bold mb-4 text-black">15. Client Data</h3>
            <p className="mb-4">When providing services, PitchKast may process data on behalf of Clients.</p>
            <p className="mb-4">Where PitchKast processes personal data according to a Client's instructions, the Client may determine the purpose and means of processing and may have separate obligations under applicable law.</p>
            <p className="mb-8">Additional data processing terms may be included in the Client's agreement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">16. Children's Data</h3>
            <p className="mb-4">Our services are intended primarily for businesses and adults.</p>
            <p className="mb-4">We do not knowingly collect children's personal data for marketing purposes.</p>
            <p className="mb-4">Where applicable law imposes additional requirements for processing children's data, we will follow those requirements.</p>
            <p className="mb-8">The DPDP Act defines a child as an individual who has not completed eighteen years. (<a href="https://www.indiacode.nic.in/bitstream/123456789/22037/2/a2023-22.pdf?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">India Code</a>)</p>

            <h3 className="text-xl font-bold mb-4 text-black">17. Publicly Available Information</h3>
            <p className="mb-4">We may process professional information that you have intentionally made publicly available, such as information contained on a public professional profile, where permitted by applicable law.</p>
            <p className="mb-8">We will not assume that all publicly available information may be used for every purpose.</p>

            <h3 className="text-xl font-bold mb-4 text-black">18. Data Retention</h3>
            <p className="mb-4">We retain personal information only for as long as reasonably necessary for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing services</li>
              <li>Maintaining business records</li>
              <li>Legal compliance</li>
              <li>Resolving disputes</li>
              <li>Enforcing agreements</li>
              <li>Preventing fraud</li>
              <li>Maintaining security</li>
              <li>Legitimate business purposes</li>
            </ul>
            <p className="mb-8">Retention periods may vary depending on the nature of the information.</p>

            <h3 className="text-xl font-bold mb-4 text-black">19. Data Deletion</h3>
            <p className="mb-4">When personal data is no longer required and there is no legal or legitimate reason to retain it, we may delete, anonymise, or securely dispose of it.</p>
            <p className="mb-8">Some information may need to be retained to satisfy legal, accounting, contractual, security, or dispute-related requirements.</p>

            <h3 className="text-xl font-bold mb-4 text-black">20. Data Security</h3>
            <p className="mb-4">We use reasonable safeguards appropriate to the information we process.</p>
            <p className="mb-4">These may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access controls</li>
              <li>Authentication controls</li>
              <li>Encryption where appropriate</li>
              <li>Secure cloud infrastructure</li>
              <li>Internal access restrictions</li>
              <li>Monitoring</li>
              <li>Backups</li>
              <li>Security procedures</li>
            </ul>
            <p className="mb-8">No system is completely secure, and we cannot guarantee absolute security.</p>

            <h3 className="text-xl font-bold mb-4 text-black">21. Data Breaches</h3>
            <p className="mb-8">If a personal data breach occurs, we will take reasonable steps to investigate, contain, remediate, and notify relevant parties or authorities where required by applicable law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">22. International Data Transfers</h3>
            <p className="mb-4">PitchKast may work with international clients and service providers.</p>
            <p className="mb-4">Personal data may therefore be processed or stored outside your country.</p>
            <p className="mb-4">Where applicable, we will take reasonable steps to ensure that such transfers comply with applicable legal requirements.</p>
            <p className="mb-8">The DPDP Act expressly addresses processing outside India in connection with offering goods or services to individuals in India. (<a href="https://www.indiacode.nic.in/show-data?abv=CEN&actid=AC_CEN_45_0_00003_2023-22_1763464807080&orderno=3&orgactid=AC_CEN_45_0_00003_2023-22_1763464807080&sectionId=101269&sectionno=3&statehandle=123456789%2F1362&utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">India Code</a>)</p>

            <h3 className="text-xl font-bold mb-4 text-black">23. Your Rights</h3>
            <p className="mb-4">Depending on applicable law, you may have rights including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access to personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Erasure of personal information</li>
              <li>Withdrawal of consent</li>
              <li>Information about processing</li>
              <li>Grievance redressal</li>
              <li>Nomination rights where applicable</li>
              <li>Other statutory rights</li>
            </ul>
            <p className="mb-8">The DPDP Act includes rights concerning access, correction, erasure, grievance redressal, and nomination. (<a href="https://www.indiacode.nic.in/handle/123456789/22037?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">India Code</a>)</p>

            <h3 className="text-xl font-bold mb-4 text-black">24. How to Exercise Your Rights</h3>
            <p className="mb-4">To submit a privacy request, contact:</p>
            <p className="mb-4">Privacy Email: [INSERT PRIVACY EMAIL]</p>
            <p className="mb-4">Please provide enough information for us to identify your request and verify your identity where reasonably necessary.</p>
            <p className="mb-8">We may request additional information to prevent unauthorised access to personal data.</p>

            <h3 className="text-xl font-bold mb-4 text-black">25. Grievance Redressal</h3>
            <p className="mb-4">If you have a concern about how we process your personal information, contact our designated grievance contact:</p>
            <p className="mb-4">Name: [INSERT NAME]</p>
            <p className="mb-4">Email: [INSERT EMAIL]</p>
            <p className="mb-4">Address: [INSERT ADDRESS]</p>
            <p className="mb-8">We will review and respond to complaints within the period required by applicable law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">26. Disclosure Required by Law</h3>
            <p className="mb-4">We may disclose information where reasonably necessary to:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Comply with law</li>
              <li>Respond to lawful requests</li>
              <li>Protect our rights</li>
              <li>Protect users</li>
              <li>Investigate fraud</li>
              <li>Prevent security threats</li>
              <li>Respond to court orders</li>
              <li>Respond to regulatory authorities</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">27. Business Transfers</h3>
            <p className="mb-8">If PitchKast is involved in a merger, acquisition, restructuring, financing, sale of assets, or similar transaction, personal information may be transferred as part of that transaction, subject to applicable law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">28. Third-Party Websites</h3>
            <p className="mb-4">Our website may link to third-party websites.</p>
            <p className="mb-4">We are not responsible for their privacy practices.</p>
            <p className="mb-8">Users should review the privacy policies of those websites before providing information.</p>

            <h3 className="text-xl font-bold mb-4 text-black">29. Data Accuracy</h3>
            <p className="mb-4">You are responsible for providing accurate information.</p>
            <p className="mb-8">If your information changes, please contact us so that we can update our records where appropriate.</p>

            <h3 className="text-xl font-bold mb-4 text-black">30. Automated Decision Making</h3>
            <p className="mb-8">Unless expressly disclosed, PitchKast does not intend to make decisions producing significant legal or similarly significant effects solely through automated processing.</p>

            <h3 className="text-xl font-bold mb-4 text-black">31. Changes to This Privacy Policy</h3>
            <p className="mb-4">We may update this Privacy Policy periodically.</p>
            <p className="mb-8">The updated version will be published on this page with the revised date.</p>

            <h3 className="text-xl font-bold mb-4 text-black">32. Contact</h3>
            <p className="mb-4">PitchKast</p>
            <p className="mb-4">Legal Entity: [INSERT LEGAL ENTITY]</p>
            <p className="mb-4">Registered Address: [INSERT ADDRESS]</p>
            <p className="mb-4">Privacy Email: [INSERT EMAIL]</p>
            <p className="mb-8">Website: <a href="https://pitchkast.com/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">pitchkast.com</a></p>
          </section>

          <div className="w-full h-px bg-gray-200 my-16"></div>

          <section id="cookie" className="scroll-mt-32 mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">Cookie Policy</h2>
            <p className="mb-8">Last Updated: 19 August 2026</p>
            
            <h3 className="text-xl font-bold mb-4 text-black">1. What Are Cookies?</h3>
            <p className="mb-4">Cookies are small files placed on your device when you visit a website.</p>
            <p className="mb-8">They help websites remember preferences, understand usage, maintain functionality, and measure performance.</p>

            <h3 className="text-xl font-bold mb-4 text-black">2. Types of Cookies We May Use</h3>
            <p className="mb-4 font-bold">Essential Cookies</p>
            <p className="mb-4">Required for basic website functionality, security, and navigation.</p>
            <p className="mb-4 font-bold">Preference Cookies</p>
            <p className="mb-4">Used to remember settings and preferences.</p>
            <p className="mb-4 font-bold">Analytics Cookies</p>
            <p className="mb-4">Used to understand website traffic and usage.</p>
            <p className="mb-4 font-bold">Marketing Cookies</p>
            <p className="mb-8">Where used, these may help measure campaigns and deliver relevant marketing.</p>

            <h3 className="text-xl font-bold mb-4 text-black">3. Third-Party Cookies</h3>
            <p className="mb-4">Third-party providers may place cookies or similar technologies through our website.</p>
            <p className="mb-8">Their own privacy policies govern their processing.</p>

            <h3 className="text-xl font-bold mb-4 text-black">4. Managing Cookies</h3>
            <p className="mb-4">You can manage cookies through browser settings.</p>
            <p className="mb-8">Blocking certain cookies may affect functionality.</p>

            <h3 className="text-xl font-bold mb-4 text-black">5. Changes</h3>
            <p className="mb-8">We may change the cookies used on the website as our technology and services evolve.</p>
          </section>

          <div className="w-full h-px bg-gray-200 my-16"></div>

          <section id="refund" className="scroll-mt-32 mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">Refund and Cancellation Policy</h2>
            
            <h3 className="text-xl font-bold mb-4 text-black mt-8">1. Service-Based Engagements</h3>
            <p className="mb-8">Refund and cancellation terms for paid services are primarily governed by the applicable proposal, statement of work, or agreement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">2. Work Already Completed</h3>
            <p className="mb-8">Fees relating to work already completed, approved, delivered, or substantially performed are generally non-refundable unless otherwise agreed or required by applicable law.</p>

            <h3 className="text-xl font-bold mb-4 text-black">3. Advance Payments</h3>
            <p className="mb-4">Advance payments may be applied against agreed services and project costs.</p>
            <p className="mb-8">If a Client terminates an engagement, PitchKast may deduct fees for work performed and non-refundable third-party expenses before calculating any applicable refund.</p>

            <h3 className="text-xl font-bold mb-4 text-black">4. Monthly Retainers</h3>
            <p className="mb-4">Monthly retainers may be subject to the notice period specified in the applicable agreement.</p>
            <p className="mb-8">Where no notice period is specified, the applicable commercial agreement will determine the cancellation process.</p>

            <h3 className="text-xl font-bold mb-4 text-black">5. Client Delays</h3>
            <p className="mb-8">A Client's failure to provide information, access, feedback, or approvals does not automatically entitle the Client to a refund.</p>

            <h3 className="text-xl font-bold mb-4 text-black">6. Third-Party Costs</h3>
            <p className="mb-8">Domain fees, hosting fees, software subscriptions, advertising spend, platform fees, stock assets, paid tools, and other third-party costs are generally non-refundable once incurred.</p>

            <h3 className="text-xl font-bold mb-4 text-black">7. Mandatory Rights</h3>
            <p className="mb-8">Nothing in this policy removes any consumer or statutory right that cannot legally be excluded.</p>
          </section>

          <div className="w-full h-px bg-gray-200 my-16"></div>

          <section id="ip" className="scroll-mt-32 mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black tracking-tight">Intellectual Property Policy</h2>
            
            <h3 className="text-xl font-bold mb-4 text-black mt-8">1. PitchKast Materials</h3>
            <p className="mb-4">PitchKast retains ownership of its pre-existing:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Frameworks</li>
              <li>Templates</li>
              <li>Processes</li>
              <li>Systems</li>
              <li>Internal tools</li>
              <li>Methodologies</li>
              <li>Code libraries</li>
              <li>Knowledge</li>
              <li>Workflows</li>
            </ul>

            <h3 className="text-xl font-bold mb-4 text-black">2. Client Deliverables</h3>
            <p className="mb-4">Ownership and licence rights for specific deliverables will be defined in the applicable agreement.</p>
            <p className="mb-8">Where ownership is transferred upon payment, the transfer applies only to the rights expressly described in that agreement.</p>

            <h3 className="text-xl font-bold mb-4 text-black">3. Third-Party Materials</h3>
            <p className="mb-8">Third-party fonts, images, software, APIs, plugins, libraries, music, stock assets, and other materials remain subject to their own licences.</p>

            <h3 className="text-xl font-bold mb-4 text-black">4. Client Materials</h3>
            <p className="mb-4">The Client retains ownership of materials supplied to PitchKast.</p>
            <p className="mb-8">The Client grants PitchKast permission to use them as necessary to perform the contracted services.</p>

            <h3 className="text-xl font-bold mb-4 text-black">5. Portfolio</h3>
            <p className="mb-8">PitchKast will not identify a Client, display private account information, or publish confidential performance data as marketing material without the required written permission.</p>
          </section>

        </main>
      </div>
    </div>
  );
}
