import { useLoaderData } from "react-router-dom";


const UpdateCoffe = () => {

    const coffee = useLoaderData();

    return (
        <div>
            <h1>Name of the Coffee : {coffee.name}</h1>
        </div>
    );
};

export default UpdateCoffe;