import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDropdown } from '../hooks/use-dropdown';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/use-click-outside';

export function Dropdown({ children, options, onOptionSelect }: { children: React.ReactNode, options: Record<string, string>, onOptionSelect: (value: string) => void }) {
	const { currentOption, isOpen, setIsOpen, toggleDropdown, handleOption } = useDropdown();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const filteredOptions = Object.entries(options).filter(([, value]) =>
		value.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Default value on render
	useEffect(() => {
		handleOption(String(children));
	}, [children]);

	// Change value from dropdown
	const handleSelection = (value: string) => {
		handleOption(value);
		onOptionSelect(value);
		setSearchQuery(''); // Clear search query after selection
		setIsOpen(false); // Close dropdown after selection
	}

	// Close dropdown clicking outside
	useClickOutside(dropdownRef, () => {
		if (isOpen) setIsOpen(false);
	});

	return (
		<div className="relative" ref={dropdownRef}>
			<button className="py-3 px-5 rounded-full flex items-center justify-between font-bold ring-1 ring-gray-200 w-full xl:min-w-[350px] shadow-lg drop-shadow" onClick={toggleDropdown}>
				{currentOption ? currentOption : children}
				<FontAwesomeIcon icon={faAngleDown} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
			</button>
			<ul className={`rounded-l-3xl mt-3 absolute z-10 left-0 w-full bg-white shadow-lg drop-shadow transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95 pointer-events-none'} max-h-[28rem] overflow-y-auto`}>
				{isOpen && <input type="text" className="w-full py-3 px-5 border-b-2 border-gray-200 focus:outline-none sticky top-0 bg-white" placeholder="Search option..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />}
				{filteredOptions.length > 0 ? (filteredOptions.map(([key, value]) => (
					<li key={key} value={key} className={`py-3 px-5 cursor-pointer hover:bg-blue-500 hover:text-white ${currentOption === value ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleSelection(value)}>
						{value}
					</li>
				))) : <li className="py-3 px-5 text-gray-500">No results found...</li>}
			</ul>
		</div>
	);
}
