import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Map from "./Map";

const props = {
    width: 400,
    height: 400,
    latitude: 40.73061,
    longitude: -73.935242,
    zoom: 10
};

const issues = [
    { latitude: 40.73061, longitude: -73.935242, description: "description1", id:"123" },
    { latitude: 40.74161, longitude: -73.946242, description: "description2", id:"321" }
];

jest.mock("../../__mocks__/react-map-gl");
afterEach(cleanup);

describe("Map Component", () => {
    it("renders the map", () => {
        const { getByTestId } = render(<Map {...props} />);
        const map = getByTestId("mapbox");
        expect(map).toBeInTheDocument();
        expect(map).toHaveStyle(`
		width: 400px;
		height: 400px;
      `);
    });

    it("renders the map with a marker", () => {
        const issue = issues[0];
        const { getAllByTestId } = render(
            <Map {...props} issues={[issue]} />
        );
        const markers = getAllByTestId('marker');
        expect(markers[0]).toHaveTextContent(`${issue.latitude}:${issue.longitude}`)
        expect(markers.length).toBe(1)

    });

    it("renders the map with multiple markers", () => {
        const [issue1, issue2] = issues
        const { getAllByTestId, getByText } = render(
            <Map {...props} issues={issues} />
        );
        const markers = getAllByTestId(`marker`);
        getByText(`${issue1.latitude}:${issue1.longitude}`)
        getByText(`${issue2.latitude}:${issue2.longitude}`)
        expect(markers.length).toBe(2)
    });

    it("renders the info when  marker is clicked", () => {
        const issue = issues[0];
        const { getByTestId, queryByTestId } = render(
            <Map {...props} issues={[issue]} />
        );
        const marker = getByTestId('pin');
        
        let info = queryByTestId("popup")
        expect(info).not.toBeInTheDocument()
        fireEvent.click(marker)
        info = getByTestId("popup")
        expect(info).toHaveTextContent(`${issue.latitude}-${issue.longitude}`)
        expect(info).toHaveTextContent(`${issue.description}`)

    });
});
