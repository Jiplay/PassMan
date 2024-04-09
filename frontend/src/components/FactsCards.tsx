import React, {useEffect, useState} from "react";

type Facts = {
    name: string;
    description: string;
}

type FactsCardsProps =  {
    facts: Facts[]
}

function FactsCards({ facts }: FactsCardsProps ) {
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFactIndex((prevIndex: number) => (prevIndex + 1) % facts.length);
        }, 10000); // 10 secondes

        return () => clearInterval(interval);
    }, [facts.length]);

    const currentFact = facts[currentFactIndex]

    return (
        <div>
            <h5 >{currentFact.name}</h5>
            <p >{currentFact.description}</p>
        </div>
    );
};

export default FactsCards;