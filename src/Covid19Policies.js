import React from 'react';
import {Col, Row, Container} from "react-bootstrap";
import JumpToTopButton from "./JumpToTopButton";
import jackRussell from "./assets/images/jackrussell.jpg";

const Covid19Policies = () => {
	return (
		<Container fluid={true} className="mt-3 covid">
			<Row className="justify-content-center">
				<Col md={10}>
					<div className="text-center">
						<img className="header-img mb-5" src={jackRussell} alt="dog wearing mask"/>
						<h1>Covid-19 Employee Policies and Procedures</h1>
						<p className="text-uppercase alpha-green--dark"><small>Last Revised May 19, 2020</small></p>
					</div>
					<hr/>
					<div id="contents">
						<h2>Contents</h2>
						<p><a href="#purpose">Purpose</a></p>
						<p><a href="#contact-information">Contact Information</a></p>
						<p><a href="#supplies">Supplies</a></p>
						<p><a href="#procedures">Procedures</a></p>
						<p><a href="#emergency-sick-leave">Emergency Sick Leave</a></p>
						<p><a href="#emergency-sick-leave-faq">Emergency Sick Leave FAQ</a></p>
						<p><a href="#additional-resources">Additional Resources</a></p>
					</div>
					<div id="purpose">
						<h2>Purpose</h2>
						<p>The purpose of this guide is to provide all employees with updated safety policies and
							procedures related to Covid-19. Due to the evolving nature of the outbreak this
							information is subject to change.</p>
					</div>
					<div id="contact-information">
						<h2>Contact Information</h2>
						<p>Alex Warner<br/>
							<a href="tel:562-547-3589">562-547-3589</a><br/>
							<a href="mailto:alexw@alphapetcare.com">alexw@alphapetcare.com</a><br/><br/>
							Michelle Harper<br/>
							<a href="tel:562-537-0260">562-547-3589</a><br/>
							<a href="mailto:michelle@alphapetcare.com">michelle@alphapetcare.com</a><br/><br/>
							Office & telephone hours are M-F from 8am - 7pm. If an
							emergency
							occurs after hours please text us and we will try to follow up with you ASAP.
						</p>
						<JumpToTopButton/>
					</div>
					<div id="supplies">
						<h2>Supplies</h2>
						<p>Management will supply staff with the following list of supplies to be used when
							providing pet care for Alpha clients. It is the employee’s responsibility to maintain
							their supply inventory and to notify management when replenishment is needed:
						</p>
						<ul>
							<li>Dog Poop Bags</li>
							<li>Face Coverings</li>
							<li>Leashes</li>
							<li>Hand Sanitizer</li>
							<li>Sanitizer Wipes</li>
						</ul>
						<p>*please note it may be necessary to modify the types and brands of supplies we use
							depending on availability
						</p>
						<h3>How Do I Get Supplies?</h3>
						<p>Initially management will reach out to each employee to schedule a time and location to pick
							up supplies. When you need to replenish please refer to <a href="#contact-information">contact
								information</a> to requisition supplies.</p>
						<JumpToTopButton/>
					</div>
					<div id="procedures">
						<h2>Procedures</h2>
						<h3>Pet Sitting & Dog Walking Visits</h3>
						<p>On Arrival/Before Entering the Home</p>
						<ol>
							<li>Wipe down the steering wheel, cell phone and client keys. NOTE: this doesn’t need to be
								done at subsequent visits if you are traveling directly from another client with no 3rd
								party interaction.
							</li>
							<li>Use sanitizer to clean hands</li>
							<li>A face covering is required to be worn when indoors</li>
							<li>Use a clean poop bag as a barrier when touching lockboxes, door knobs, handrails,
								elevator buttons etc.
							</li>
						</ol>
						<p>During the Visit</p>
						<ol>
							<li>Upon entering the home immediately wash your hand with soap and warm water for 20
								seconds. Clients are required to provide a sink and soap for you to use.
							</li>
							<li>If anyone else is present be sure to maintain a minimum distance of 6 feet</li>
							<li>Perform pet care duties
							</li>
							<li>While dog walking you must have a face covering available at all times. However wearing
								a mask is mandatory only when it is not possible to maintain a minimum distance of 6
								feet and/or in densely populated areas where it would be difficult to anticipate other
								people (Belmont Shore, Downtown Long Beach).
							</li>
							<li>Wash your hands with soap and warm water for 20 seconds</li>
							<li>Use a clean poop bag as a barrier when exiting the client’s residence.</li>
						</ol>
						<p>After the Visit</p>
						<ol>
							<li>Wipe down your poop bag, keys and cell phone.</li>
						</ol>
						<h3>Doggie DayCamp</h3>
						<p>Pickups/Drop-offs</p>
						<ol>
							<li>Wipe down the steering wheel, cell phone and client keys. NOTE: this doesn’t need to be
								done at subsequent stops if you are traveling directly from another client with no 3rd
								party interaction.
							</li>
							<li>Clean hands with sanitizer
							</li>
							<li>A face covering is required to be worn when indoors and/or when other people are present
							</li>
							<li>Use a clean poop bag as a barrier when touching lockboxes, door knobs, handrails,
								elevator buttons etc.
							</li>
							<li>If anyone else is present be sure to maintain a minimum distance of 6 feet
							</li>
							<li>Leash/unleash dog dog and use
							</li>
							<li>Use a clean poop bag as a barrier when touching lockboxes, door knobs, handrails,
								elevator buttons etc.
							</li>
							<li>Wipe down your poop bag, keys and cell phone
							</li>
						</ol>
						<p>During Session</p>
						<ol>
							<li>Masks: You must have a mask available at all times. Wearing a mask in the play area is
								mandatory when there are more than 2 people present or it is not possible to maintain a
								minimum distance of 6 feet.
							</li>
							<li>Use a clean poop bag to touch surfaces like gate latches, doorknobs, water spigots, hose
								sprayer, water dishes
							</li>
						</ol>
						<h3>About Gloves</h3>
						<p>Disposable plastic gloves are optional and will be provided upon request, they should be
							cleaned with sanitizer or wipes using the same protocol as hand cleaning previously
							described in this section.
						</p>
						<JumpToTopButton/>
					</div>
					<div id="emergency-sick-leave">
						<h2>Families First Coronavirus Response Act (FFCRA) Emergency Sick Leave</h2>
						<p>The Company provides eligible employees with emergency paid sick leave under certain
							conditions.</p>
						<h3>Eligibility</h3>
						<p>All employees are eligible for emergency paid sick leave.</p>
						<h3>Reason for Leave</h3>
						<p>You may take emergency paid sick leave if you are unable to work (or work from home)
							because:</p>
						<ol>
							<li>You are subject to a federal, state, or local quarantine or isolation order related to
								COVID-19
							</li>
							<li>You have been told to self-quarantine because you have COVID-19, may have COVID-19, or
								are particularly vulnerable to COVID-19
							</li>
							<li>You are experiencing symptoms of COVID-19 and are seeking a medical diagnosis.
							</li>
							<li>You are caring for an individual who has been ordered or advised to quarantine by a
								government agency or health care provider.
							</li>
							<li>You are caring for a child whose school or place of care is closed, or whose childcare
								provider is unavailable, due to COVID-19 precautions
							</li>
						</ol>
						<h3>Duration</h3>
						<p>Full-time employees are eligible for 80 hours of leave</p>
						<p>Part-time employees are eligible for the number of hours they work, on average, over a
							two-week period.</p>
						<h3>Compensation</h3>
						<ul>
							<li>Leave will be paid at an employee's regular rate of pay, subject to a limit of $511 per
								day
								and $5,110 in total, when leave is taken for reasons 1, 2, or 3.
							</li>
							<li>Leave will be paid at 2/3 of an employee's regular rate of pay, subject to a limit of
								$200
								per day and $2,000 in total. where leave is taken for reasons 4 or 5.
							</li>
						</ul>
						<h3>Leave Rules</h3>
						<ul>
							<li>You may elect to use emergency paid sick leave before using any other accrued paid
								leave.
							</li>
							<li>Leave provided by the Company prior to April 1, 2020 will not count against your FFCRA
								leave.
							</li>
							<li>Emergency paid sick leave cannot be carried over after December 31, 2020.</li>
						</ul>
						<h3>Requesting Leave</h3>
						<p>If you need to take emergency paid sick leave, provide notice as soon as possible. Normal
							call-in procedures apply to all absences from work.</p>
						<h3>Retaliation</h3>
						<p>Alpha Pet Care will not retaliate against employees who request or take leave in accordance
							with this policy.</p>
						<h3>Potential Exemption</h3>
						<p>The Company as a small business with fewer than 50 employees, may need to deny otherwise
							qualifying leave under this policy if granting such leave would jeopardize the viability of
							our business as an ongoing concern. The Company is exempt from the requirement of providing
							expanded family and medical leave when:</p>
						<ul>
							<li>Such leave would cause the Company’s expenses and financial obligations to exceed
								available business revenue and cause the Company to cease operating at a minimal
								capacity; or
							</li>
							<li>The absence of the employee or employees requesting such leave would pose a substantial
								risk to the financial health or operational capacity of the Company because of their
								specialized skills, knowledge of the business, or responsibilities; or
							</li>
							<li>The Company cannot find enough other workers who are able, willing, and qualified and
								who will be available at the time and place needed, to perform the labor or services the
								employee or employees requesting leave provide, and these labor and services are needed
								for the small employer to operate at a minimum capacity.
							</li>
						</ul>
						<h3>Expiration</h3>
						<p>This policy expires on December 31, 2020.</p>
						<p>
							<a rel="noreferrer noopener"
							   target="_blank"
							   href="https://www.dol.gov/sites/dolgov/files/WHD/posters/FFCRA_Poster_WH1422_Non-Federal.pdf">
								<strong>View the official Department of Labor poster here</strong>
							</a>
						</p>
						<JumpToTopButton/>
					</div>
					<div id="emergency-sick-leave-faq">
						<h2>Sick Leave Procedures FAQ</h2>
						<h3>When should an employee call in sick?</h3>
						<p>If you are experiencing symptoms associated with Covid-19 (fever, cough, shortness of breath
							or difficulty breathing, chills, muscle pain, headache, sore throat, loss of taste or smell)
							call management right away to discuss the appropriate next steps.</p>
						<h3>When can a previously sick employee return to work?</h3>
						<p>All of the following criteria must be met:</p>
						<ul>
							<li>You have had no fever for at least 72 hours without the use of fever-reducing medicine
							</li>
							<li>All other symptoms have improved such as cough, shortness of breath</li>
							<li>At least 7 days have passed since your first symptoms appeared</li>
						</ul>
						<h3>What if someone in an employee’s household is experiencing Covid-19 symptoms?</h3>
						<p>If someone in your household is experiencing symptoms related to Covid-19 it is recommended
							that you try to reach your healthcare provider for guidance. If your health care provider
							suggests that you self-isolate for a period of time you can request Emergency Paid Sick
							Leave under the FFCRA.</p>
						<p>If you are not symptomatic then continuing to work may be an option if the household member
							can self-isolate from the rest of the household.</p>
						<p>If an employee is living with someone
							who has a confirmed case of COVID-19, then they should follow the guidance of their
							healthcare
							provider. Most likely the Department of Health will officially quarantine that individual.
							The
							Department of Health will then follow up with individuals who have been in close contact
							with
							that person and discuss the precautions they need to take. If an employee is ordered to
							self-isolate or quarantine by the Department of Health or any other government entity or
							healthcare provider, they would be eligible for Emergency paid sick leave under FFCRA.
						</p>
						<JumpToTopButton/>
					</div>
					<div id="additional-resources">
						<h2>Additional Resources</h2>
						<p><a rel="noreferrer noopener" target="_blank" href="http://www.longbeach.gov/health/">City of
							Long Beach</a></p>
						<p><a rel="noreferrer noopener" target="_blank" href="http://www.publichealth.lacounty.gov/">Los
							Angeles County Public Health</a></p>
						<p><a rel="noreferrer noopener" target="_blank" href="https://www.cdph.ca.gov/">California
							Department of Public Health</a></p>
						<p><a rel="noreferrer noopener" target="_blank"
						      href="https://www.cdc.gov/coronavirus/2019-nCoV/index.html">Center for Disease Control</a>
						</p>
						<JumpToTopButton/>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default Covid19Policies;