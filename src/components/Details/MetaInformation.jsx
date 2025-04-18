import React from 'react'
import  './Details.css'

const MetaInformation = () => {
  return (
    <>
     <div className="row mt-3 border-top pt-4">
                <h6>Where you’ll be</h6>
                <span>Saint-Mandé, Île-de-France, France
                </span>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11707.839013385668!2d32.75466086315528!3d26.183268106568324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x144eb713cdff7243%3A0xde1579ce56fe6177!2zSVRJINmF2LnZh9ivINiq2YPZhtmI2YTZiNis2YrYpyDYp9mE2YXYudmE2YjZhdin2KogLSDZgdix2Lkg2YLZhtin!5e0!3m2!1sar!2seg!4v1737903829868!5m2!1sar!2seg"
                    width="300" height="450" style={{border:"0"}} loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                <div className="mt-3">
                    <span>
                        We verified that this listing’s location is accurate..
                    </span>
                    <span>
                        <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                            Learn more</button>
                    </span>
                </div>
            </div>

            <div className="mt-5 border-top pt-4">
                <h4>Neighborhood highlights</h4>
                <span>A lot of shops around, restaurants, Vincennes wood
                </span>

                <div className="mt-3">
                    <span>
                        <button type="button" className="btn-dark border-0 bg-body ms-2 p-0  text-decoration-underline">
                            Show more</button> <span>  </span>
                    </span>
                </div>
            </div>
    </>
  )
}

export default MetaInformation