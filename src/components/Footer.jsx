const Footer = () => {
  return (
    <footer className="mt-7  bottom-0 left-0 w-full bg-base-200 text-base-content px-6 py-2 flex flex-col items-center text-sm">
      <nav className="flex gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <div className="flex gap-4 mt-1">
        <a
          href="https://www.linkedin.com/in/praveen-udayagiri-589775259"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 
          2.76 2.24 5 5 5h14c2.76 0 5-2.24 
          5-5v-14c0-2.76-2.24-5-5-5zm-11 
          19h-3v-10h3v10zm-1.5-11.268c-.966 
          0-1.75-.79-1.75-1.764s.784-1.764 
          1.75-1.764 1.75.79 
          1.75 1.764-.784 1.764-1.75 
          1.764zm13.5 11.268h-3v-5.604c0-3.368-4-3.113-4 
          0v5.604h-3v-10h3v1.528c1.396-2.586 
          7-2.777 7 2.476v5.996z" />
          </svg>
        </a>
        <a
          href="https://github.com/praveenudayagiri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 .5c-6.627 0-12 5.373-12 
          12 0 5.302 3.438 9.8 8.205 
          11.387.6.113.82-.26.82-.577 
          0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
          1.205.085 1.84 1.238 
          1.84 1.238 1.07 1.834 2.807 
          1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 
          0-1.311.469-2.382 
          1.236-3.221-.124-.303-.536-1.524.117-3.176 
          0 0 1.008-.322 3.301 
          1.23.957-.266 1.983-.399 
          3.003-.404 1.02.005 2.047.138 
          3.006.404 2.291-1.552 
          3.297-1.23 3.297-1.23.655 1.653.243 
          2.874.12 3.176.77.839 
          1.235 1.91 1.235 3.221 0 4.609-2.804 
          5.624-5.475 5.921.43.371.823 1.102.823 
          2.222 0 1.605-.015 2.898-.015 
          3.293 0 .32.216.694.825.576 
          4.765-1.589 8.2-6.086 
          8.2-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a href="mailto:praveenudayagiri724@gmail.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 13.5l-11.5-7.5v13.5c0 
          1.105.895 2 2 2h19c1.105 
          0 2-.895 2-2v-13.5l-11.5 
          7.5zm11.5-9.5c0-1.105-.895-2-2-2h-19c-1.105 
          0-2 .895-2 
          2l12 8 11-8z" />
          </svg>
        </a>
      </div>
      <aside className="mt-1 text-xs">
        <p>
          © {new Date().getFullYear()} Praveen Udayagiri. All rights reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
