import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Map from "./Map";

const props = {
    width: 400,
    height: 400,
    latitude: 40.73061,
    longitude: -73.935242,
    zoom: 10
};

jest.mock("../../__mocks__/react-map-gl");
afterEach(cleanup);

describe("Map Component", () => {
    it("renders the map", () => {
        const { getByTestId, debug } = render(<Map {...props} />);
        const map = getByTestId("mapbox");
        expect(map).toBeInTheDocument();
        expect(map).toHaveStyle(`
		width: 400px;
		height: 400px;
	  `);
    });
});
