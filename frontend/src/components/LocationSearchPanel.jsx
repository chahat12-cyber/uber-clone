const LocationSearchPanel = ({ suggestions, onSuggestionClick }) => {
  return (
    <div>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => onSuggestionClick(suggestion.description)}
          className="flex items-center justify-start gap-4 my-5 mx-4 p-3 rounded-xl border-2 cursor-pointer transition-colors border-gray-100"
        >
          <h2 className="bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-base text-sm">{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};


export default LocationSearchPanel;