import { Component } from "solid-js";
import { toggleTheme } from "../stores/theme.store";
import Watch from "./Watch";

const Nav: Component = () => {
  return (
    <div class="navbar bg-neutral shadow-lg mb-4">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              /></svg
            >
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 font-poppins shadow"
          >
            <li><a href="/">Homepage</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/country">Country</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="upper-case btn btn-ghost font-poppins text-xl text-primary">daisyUI</a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle" onClick={() => toggleTheme()} >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24px"
            height="24px">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        <Watch />
      </div>
    </div>
  );
};

export default Nav;
