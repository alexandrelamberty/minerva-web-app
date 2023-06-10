import { PreloadedState } from "@reduxjs/toolkit";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
// As a basic setup, import your same slice reducers
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppStore, RootState, setupStore } from "../store/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * @see https://redux.js.org/usage/writing-tests
 * @param ui
 * @param param1
 * @returns
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
