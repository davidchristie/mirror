import { render } from "@testing-library/react";
import { PassThrough } from "stream";
import { App } from "./App";

describe("<App />", () => {
  const originalNavigator = window.navigator;

  let mockGetUserMedia: jest.Mock;

  beforeAll(() => {
    mockGetUserMedia = jest.fn();
    Object.defineProperty(window.navigator, "mediaDevices", {
      value: {
        getUserMedia: mockGetUserMedia,
      },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "navigator", {
      value: originalNavigator,
    });
  });

  describe("with camera", () => {
    beforeEach(() => {
      mockGetUserMedia.mockResolvedValue(new PassThrough());
    });

    it("renders correctly", () => {
      const result = render(<App />);
      const app = result.container.firstChild;
      expect(app).toHaveClass("App");
      expect(app).toMatchSnapshot();
    });
  });

  describe("without camera", () => {
    beforeEach(() => {
      mockGetUserMedia.mockRejectedValue(new DOMException("Permission denied"));
    });

    it("renders correctly", () => {
      const result = render(<App />);
      const app = result.container.firstChild;
      expect(app).toHaveClass("App");
      expect(app).toMatchSnapshot();
    });
  });
});
