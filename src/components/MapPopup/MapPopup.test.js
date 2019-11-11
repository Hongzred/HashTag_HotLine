import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
    render,
    cleanup,
    fireEvent,
    waitForDomChange
} from "@testing-library/react";
import axios from "axios";
//import reverseGeocode from "./reverseGeocode";
import MapPopup from "./MapPopup";

jest.mock("../../__mocks__/react-map-gl");

const props = {
    latitude: 40.73061,
    longitude: -73.935242,
    description: "description1",
    popupCloseHandler: jest.fn()
};

afterEach(cleanup);

describe("MapPopup Component", () => {
    it("renders loading popup", () => {
        const { getByTestId } = render(<MapPopup {...props} />);

        const popup = getByTestId("popup");
        const location = getByTestId("location_popup");
        const report = getByTestId("report_popup");

        expect(popup).toBeInTheDocument();
        expect(location).toHaveTextContent("Loading...");
        expect(report).toHaveTextContent(props.description);
        expect(props.popupCloseHandler).toHaveBeenCalledTimes(0);
    });

    
});
