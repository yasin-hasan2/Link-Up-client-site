import { useLoaderData } from "react-router-dom";
import SectionHelmet from "../../../shared/SectionHelmet/SectionHelmet";
import Feed from "../../../shared/Feed/Feed";


const DynamicFeeds = () => {
    const data = useLoaderData()
    return (
        <section>
            <SectionHelmet title={"Free Time | Feeds"}/>
            <div>
                <Feed feed={data}/>
            </div>
        </section>
    );
};

export default DynamicFeeds;