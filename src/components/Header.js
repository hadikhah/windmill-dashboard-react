import React, { useContext, useState, useEffect } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const [dir, setDir] = useState("ltr");
  const { toggleSidebar } = useContext(SidebarContext)

  useEffect(() => {
    const dir = localStorage.getItem("dir")

    setDir(dir && "ltr")

    document.querySelector("html").dir = dir && "ltr"

  }, []);

  const DirectionHandler = () => {
    setDir(dir == "rtl" ? "ltr" : "rtl")

    localStorage.setItem("dir", dir == "rtl" ? "ltr" : "rtl")

    document.querySelector("html").dir = dir == "rtl" ? "ltr" : "rtl"
  }

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 me-5 -ms-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:me-32">
          <div className="relative w-full max-w-xl me-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center ps-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="ps-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-s-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={DirectionHandler}
              aria-label="Toggle color mode"
            >
              {dir === 'rtl' ? (
                <span>Ltr</span>
              ) : (
                <span>Rtl</span>
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 end-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="end"
              className="end-0"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Messages</span>
                <Badge type="danger">13</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Sales</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="end"
              className="end-0"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#">
                <OutlinePersonIcon className="w-4 h-4 me-3" aria-hidden="true" />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem tag="a" href="#">
                <OutlineCogIcon className="w-4 h-4 me-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={() => alert('Log out!')}>
                <OutlineLogoutIcon className="w-4 h-4 me-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
