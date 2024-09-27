

export default function Hero() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Share Notes, <span className="text-indigo-600">Ace Your Studies</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
            Create and join study groups, upload and share notes, and collaborate with classmates to excel in your subjects.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="Students collaborating"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}