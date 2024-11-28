'use client';

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Footer from "./Footer";
import Header from "./Header";
import HomePage from "./Pages/Home";
import { PusherProvider } from "@/context/PusherProvider";
import { pusherKey } from "@/lib/constants";
import PusherEvents from "./PusherEvents";
import Wallet from "./Pages/Wallet";
import UserProvider from "@/context/User";
import Share from "./Pages/Share";

export default function Page() {
  return (
    <TonConnectUIProvider manifestUrl={`/tonconnect-manifest.json`}>
      <div id="app" className="bg-[#0C0C0C] text-white">
        <UserProvider>
          <PusherProvider
            clientKey={pusherKey}
            cluster='eu'
          >
            <Router>
              <Header />
              <main className="overflow-x-hidden">
                <Switch>
                  <Route path="/share">
                    <Share />
                  </Route>
                  <Route path="/wallet">
                    <Wallet />
                  </Route>
                  <Route path="/">
                    <HomePage />
                  </Route>
                </Switch>
              </main>
              <Footer />
              <PusherEvents />
            </Router>
          </PusherProvider>
        </UserProvider>
      </div>
    </TonConnectUIProvider>
  )
}