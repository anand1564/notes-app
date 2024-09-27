

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/about" className="text-base text-gray-300 hover:text-white">
                  Company
                </a>
              </li>
              <li>
                <a href="/team" className="text-base text-gray-300 hover:text-white">
                  Team
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/privacy" className="text-base text-gray-300 hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-base text-gray-300 hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="/faq" className="text-base text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="text-base text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 NoteShare, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}