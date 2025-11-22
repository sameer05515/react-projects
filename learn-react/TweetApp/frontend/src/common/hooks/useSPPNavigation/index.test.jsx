import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import useSPPNavigation from "./index";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

jest.mock("./util", () => ({
  __esModule: true,
  default: {
    home: () => ({ to: { pathname: "/" }, options: undefined }),
    login: () => ({ to: { pathname: "/login" }, options: undefined }),
    testRoute: (id) => ({
      to: { pathname: `/test-route/${id}` },
      options: undefined,
    }),
    interviewMgmtBase: () => ({
      to: { pathname: "/interview-mgmt" },
      options: undefined,
    }),
    interviewMgmtModuleSearch: () => ({
      to: { pathname: "/interview-mgmt/search" },
      options: undefined,
    }),
    question: (questionId) => ({
      to: { pathname: `/interview-mgmt/questions/${questionId}` },
      options: undefined,
    }),
    createQuestion: (parentQuestionId) => ({
      to: { pathname: "/interview-mgmt/questions/create" },
      options: parentQuestionId ? { state: { parent: parentQuestionId } } : undefined,
    }),
  },
}));

function Probe() {
  const {
    goBack,
    goToHome,
    goToLogin,
    goToQuestion,
    goToInterviewMgmtBase,
  } = useSPPNavigation();

  return (
    <div>
      <button type="button" onClick={goBack}>
        back
      </button>
      <button type="button" onClick={goToHome}>
        home
      </button>
      <button type="button" onClick={goToLogin}>
        login
      </button>
      <button type="button" onClick={() => goToQuestion(undefined)}>
        badQuestion
      </button>
      <button type="button" onClick={() => goToQuestion("q1")}>
        goodQuestion
      </button>
      <button type="button" onClick={goToInterviewMgmtBase}>
        interviewBase
      </button>
    </div>
  );
}

describe("common/hooks/useSPPNavigation", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("goBack calls navigate(-1)", () => {
    render(<Probe />);
    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("goToHome calls navigate with route.to and options", () => {
    render(<Probe />);
    fireEvent.click(screen.getByRole("button", { name: /home/i }));
    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: "/" },
      undefined
    );
  });

  it("goToQuestion with missing id does not navigate and logs error", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<Probe />);
    fireEvent.click(screen.getByRole("button", { name: /badQuestion/i }));

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("goToInterviewMgmtBase navigates to the expected route", () => {
    render(<Probe />);
    fireEvent.click(screen.getByRole("button", { name: /interviewBase/i }));

    expect(mockNavigate).toHaveBeenCalledWith(
      { pathname: "/interview-mgmt" },
      undefined
    );
  });
});

