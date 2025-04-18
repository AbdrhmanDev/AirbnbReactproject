import React from 'react'
import  './Details.css'

const Thingstoknow = () => {
  return (
    <>
     <div className="mt-5 border-top pt-4 row">
                <h4>Meet your host</h4>
                <div className="col-md-4 col-8 flex-column ">
                    <div className="custom_card p-4 shadow-lg row " role="button">
                        <div className="col-6 text-center align-content-center">
                            <img src="imgs/avtar.png" className="userImg2" alt=""/>
                            <h2>stephane</h2>
                            <p>Superhost</p>
                        </div>
                        <div className="col-6">
                            <h3 className="ms-4">401</h3>
                            <p className="border-bottom py-0 pb-2 ms-4">Reviews</p>
                            <h3 className="ms-4">4.97 <i className="fa-solid fa-star fs-6"></i></h3>
                            <p className="border-bottom pb-2 py-0 ms-4">Rating</p>
                            <h3 className="ms-4">10</h3>
                            <p className="ms-4 py-0">Years hoisting</p>
                        </div>
                        <div className="col-6"></div>
                    </div>
                    <div className="mt-4">
                        <p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                                role="presentation" focusable="false"
                                style={{ height: "24px", width: "24px", fill: "currentcolor"}}>
                                <path
                                    d="M16 0c5.9 0 11 5.28 11 11 0 4.85-3.23 9.27-9.55 13.28l2.2 2.92a1.13 1.13 0 0 1-.9 1.8H17v3h-2v-3h-1.75a1.13 1.13 0 0 1-.9-1.8l2.14-2.86C8.2 20.92 5 16.46 5 11A11 11 0 0 1 16 0zm0 25.67L15 27h2zM16 2a9 9 0 0 0-9 9c0 4.6 2.72 8.43 8.3 11.5l.38.21.28.14.3-.19c5.62-3.53 8.48-7.24 8.72-11.12l.02-.27V11c0-4.64-4.21-9-9-9z">
                                </path>
                            </svg>
                            <span>asdasd</span>
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                                role="presentation" focusable="false"
                                style={{ height:" 24px", width: "24px", fill: "currentcolor"}}>
                                <path
                                    d="M20 2a2 2 0 0 1 2 1.85V6h6a3 3 0 0 1 3 2.82V27a3 3 0 0 1-2.82 3H4a3 3 0 0 1-3-2.82V9a3 3 0 0 1 2.82-3H10V4a2 2 0 0 1 1.85-2H12zm8 6H4a1 1 0 0 0-1 .88V12a3 3 0 0 0 2.82 3H13v2H6a4.98 4.98 0 0 1-3-1v11a1 1 0 0 0 .88 1H28a1 1 0 0 0 1-.88V16c-.78.59-1.74.95-2.78 1h-7.17v-2H26a3 3 0 0 0 3-2.82V9a1 1 0 0 0-.88-1zm-10 4a1 1 0 0 1 1 .88V19a1 1 0 0 1-.88 1H14a1 1 0 0 1-1-.88V13a1 1 0 0 1 .88-1H14zm-1 2h-2v4h2zm3-10h-8v2h8z">
                                </path>
                            </svg>
                            <span>My work: Teacher
                            </span>
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                                role="presentation" focusable="false"
                                style={{ height:" 24px", width: "24px", fill: "currentcolor"}}>
                                <path
                                    d="M16 .33a15.67 15.67 0 1 1 0 31.34A15.67 15.67 0 0 1 16 .33zm0 2a13.67 13.67 0 1 0 0 27.34 13.67 13.67 0 0 0 0-27.34zm1 3v10.1l8.74 5.04-1 1.73L15 16.58V5.33z">
                                </path>
                            </svg> <span>I spend too much time: The lecture
                            </span>
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                                role="presentation" focusable="false"
                                style={{ height:" 24px", width: "24px", fill: "currentcolor"}}>
                                <path
                                    d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z">
                                </path>
                            </svg><span>Pets: None
                            </span>
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"
                                role="presentation" focusable="false"
                                style={{ height:" 24px", width: "24px", fill: "currentcolor"}}>
                                <path
                                    d="M22 15a5 5 0 0 1 3.4 8.67 9 9 0 0 1 5.6 8.06V32h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-2 0v2.24c-1.37.2-2.64.8-3.67 1.71 1 1.4 1.61 3.11 1.67 4.95V32h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-2 0v2.24a7 7 0 0 0-6 6.69V32H1a9 9 0 0 1 5.6-8.34A4.98 4.98 0 0 1 10 15a5 5 0 0 1 3.4 8.67 9 9 0 0 1 2.6 1.62 8.95 8.95 0 0 1 2.6-1.62A4.99 4.99 0 0 1 22 15zm0-15a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-3l-3 4-3-4h-3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2H10a1 1 0 0 0-1 .88V10a1 1 0 0 0 .88 1H14l2 2.67L18 11h4a1 1 0 0 0 1-.88V3a1 1 0 0 0-.88-1z">
                                </path>
                            </svg>
                            <span>I’m happy to spend time with my guests or give them space
                            </span>
                        </p>
                        <p>Hello, I appreciate exchanges and discoveries
                        </p>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>
                </div>

                <div className="col-md-8 col-12 ps-5 ">
                    <h5>Stephane is a Superhost
                    </h5>
                    <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for
                        guests.
                    </p>
                    <h5>Host details
                    </h5>
                    <p>Response rate: 100%
                    </p>
                    Responds within an hour
                    <div> <button className="btn btn-dark mt-4">Message host</button>
                    </div>
                    <p className="border-bottom pb-4 mt-3">You can message the host in Chinese, and Airbnb provides a
                        translation function
                    </p>
                    <p className="mt-3">
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            role="presentation" focusable="false"

                            style={{ height:" 24px", width: "24px", stroke: "currentcolor",fill: "rgb(227, 28, 95)"}}
                            >
                            <g>
                                <g stroke="none">
                                    <path
                                        d="m25 5 .5846837.00517475c4.2905015.07574932 8.8374917.98334075 13.644943 2.73687823l.7703733.28794702v27.3705076l-.0084766.1301365c-.0392237.2994207-.2122236.5656263-.4699074.7230756l-.1154775.0605995-11.4234694 5.0774159c.0623636-.7458456-.0433445-1.4943022-.3209346-2.2783707-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487l-.3317555-.6369277c-.4686141-.9115826-.8248653-1.6297768-1.3147672-2.2052384-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-.4956822.9653459-.9868615 1.9338929-1.47282629 2.9041739l.00159179-19.0721502.769087-.28647781c4.798406-1.75037189 9.3373349-2.65799308 13.6207364-2.73688762z"
                                        fillOpacity=".2"></path>
                                    <path
                                        d="m25 1c5.5985197 0 11.5175072 1.27473768 17.7548231 3.81642897.7027419.28641855 1.1783863.94329535 1.2386823 1.69066764l.0064946.16143432v28.73197667c0 1.8999458-1.0758761 3.6285379-2.7638433 4.4721215l-.2054644.0969363-15.0427818 6.6856808c-.4614217.2050763-1.8621146.3276624-2.7955525.3430957l-.192358.0016581.0009065-1.0005013c.6483674-.0069073 1.2843321-.1330366 1.8784107-.3747752.8327784-.3388673 1.5457548-.8939986 2.0790671-1.5885618l13.2600311-5.8942194c1.023196-.4547538 1.7028179-1.4383245 1.7751735-2.5449525l.0064111-.1964822v-28.73197667l-.6916987-.27704554c-5.7517231-2.26330416-11.1871718-3.39148539-16.3083013-3.39148539-5.1211255 0-10.5565697 1.12817946-16.3082877 3.39148006l-.6917123.27707479-.00030284 24.49382405c-.68067737 1.4079172-1.34834149 2.8151846-2.00083161 4.2173468l.00113445-28.71117085c0-.81311953.4922453-1.5453083 1.24525131-1.85215622 6.23725069-2.54166294 12.15623339-3.81639863 17.75474869-3.81639863z">
                                    </path>
                                </g>
                                <path
                                    d="m15.999908 41.6930234.6867258-.8851772c1.5957359-2.0328613 2.5919668-3.8873951 2.9612752-5.511912.2804314-1.2318637.2318527-2.5167089-.4804505-3.5591688-.6801015-.9952012-1.8642067-1.5894421-3.1673665-1.5894421-1.3033438 0-2.487633.5940563-3.1675505 1.5890729-.7099111 1.039137-.761802 2.3201055-.4810025 3.5580612.3689403 1.6247015 1.3653552 3.4796045 2.9616432 5.5133888l.6867258.8851772.6447715.7192179c1.1495113 1.2599236 2.1735278 2.122579 3.2227536 2.7149739.8151649.4602182 1.6400823.7413704 2.4521191.8358878.8812245.1033783 1.7585848-.0123685 2.559765-.3383795 1.6422905-.6682672 2.8186673-2.1775911 3.0700251-3.9387151.1205267-.8438258.0264975-1.6854363-.2876078-2.572644-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487-.6486357-1.2222643-1.0477537-2.1388241-1.6465227-2.8421661-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-2.1326775 4.1534098-4.1819984 8.3660775-6.09128759 12.5211487-.28227155.6306079-.79308369 1.6933742-1.04168139 2.3948702-.3141053.8872077-.40813448 1.7288182-.28760784 2.5731978.25117384 1.7609394 1.42736664 3.2700787 3.06965711 3.9385305.81939715.3333951 1.69418134.4397272 2.55958102.3385641.81295679-.0948866 1.63805829-.3760388 2.45248709-.8360724 1.0492258-.5922103 2.0732422-1.4550503 3.2227536-2.7149739z"
                                    fill="none" strokeWidth="2"></path>
                            </g>
                        </svg>
                        <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.
                        </span>
                    </p>
                </div>
            </div>

            <div className="container mt-5 border-top pt-4">
                <h3 className="mb-4">Things to know</h3>
                <div className="row">

                    <div className="col-md-4 mb-3">
                        <h5>House rules</h5>
                        <ul className="list-unstyled">
                            <li>Flexible check-in</li>
                            <li>Checkout before 12:00PM</li>
                            <li>2 guests maximum</li>
                        </ul>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>


                    <div className="col-md-4 mb-3">
                        <h5>Safety & property</h5>
                        <ul className="list-unstyled">
                            <li>Nearby lake, river, other body of water</li>
                            <li>Climbing or play structure</li>
                            <li>Carbon monoxide alarm</li>
                        </ul>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>


                    <div className="col-md-4 mb-3">
                        <h5>Cancellation policy</h5>
                        <ul className="list-unstyled">
                            <li>Free cancellation before May 9</li>
                            <li>Cancel before check-in on May 14 for a partial </li>
                            <li>Review this Host's full policy for details</li>
                        </ul>
                        <span>
                            <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                                Show more</button> <span></span>
                        </span>
                    </div>
                </div>

            </div>
    </>
  )
}

export default Thingstoknow