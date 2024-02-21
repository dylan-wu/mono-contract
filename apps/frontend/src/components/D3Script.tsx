import {useEffect} from "react";

interface MyWindow extends Window {
    d3: any;
}

declare var window: MyWindow;

interface DataItem {
    label: string;
    cost: number;
    width: number;
    white_rect_x: number;
}

interface D3ScriptProps {
    data: DataItem[];
}

const D3Script: React.FC<D3ScriptProps> = ({ data }) => {
    useEffect(() => {
        const d3 = window.d3;

        const bars = d3.select("#bars")
            .selectAll("div")
            .data(data)
            .enter()
            .append("div")
            .attr("class", "bar-container")
            .style("justify-content", "flex-start");

        bars.append("div")
            .attr("class", "bar-label")
            .text("Company Logo Here");

        bars.append("svg")
            .attr("width", 318)
            .attr("height", 20)
            .append("rect")
            .attr("width", (d: DataItem) => d.width)
            .attr("height", 20)
            .attr("rx", 4)
            .attr("fill", "#5DA5DA");

        bars.select("svg")
            .append("rect")
            .attr("x", (d: DataItem) => d.white_rect_x)
            .attr("y", 5)
            .attr("width", 3)
            .attr("height", 10)
            .attr("rx", 1.5)
            .attr("fill", "white");

        bars.append("span")
            .attr("class", "dollar-text")
            .text((d: DataItem) => d.cost === 74000 ? "Content" : `$${d.cost.toLocaleString()}`);
    }, []);

    return null;
};

export default D3Script;
