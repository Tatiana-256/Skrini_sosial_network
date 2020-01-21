import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="It`s magic world" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("It`s magic world");
  });

  test("after creation <span> should be displaid", () => {
    const component = create(<ProfileStatus status="It`s magic world" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation <span> should contains correct status", () => {
    const component = create(<ProfileStatus status="It`s magic world" />);
    const root = component.root;
    let span = root.findByType("span");
    expect(span.children[0]).toBe("It`s magic world");
  });

  test("input should be displayed in editMode", () => {
    const component = create(<ProfileStatus status="It`s magic world" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("It`s magic world");
  });
});
