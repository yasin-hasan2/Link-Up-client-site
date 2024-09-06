/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const SectionHelmet = ({title}) => {
    return ( 
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </div>
     );
}
 
export default SectionHelmet;