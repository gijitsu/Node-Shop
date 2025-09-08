import { Dropdown, DropdownItem } from "flowbite-react";

export function UserDropdown({ logoutHandler }) {
  return (
    <Dropdown label="Me" dismissOnClick={false} className="bg-orange-600">
      <DropdownItem className="bg-white">Profile</DropdownItem>
      <DropdownItem className="bg-white">Purchase</DropdownItem>
      <DropdownItem className="bg-white" onClick={ logoutHandler }>Sign out</DropdownItem>
    </Dropdown>
  );
}