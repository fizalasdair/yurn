"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7796],{27796:function(t,r,e){e.r(r),e.d(r,{Marketplace:function(){return W}});var a,i=e(62),n=e(72548),s=e(25025),o=e(70332),c=e(8455),d=e(9279),p=e(2593),l=e(19485),g=e(21046),h=e(64146),u=e(61744),f=e(38776);let w=((a={})[a.Direct=0]="Direct",a[a.Auction=1]="Auction",a);class m{constructor(t,r){this.contractWrapper=t,this.storage=r}getAddress(){return this.contractWrapper.readContract.address}async getListing(t){let r=await this.contractWrapper.readContract.listings(t);if(r.assetContract===d.d)throw new n.bw(this.getAddress(),t.toString());if(r.listingType!==w.Direct)throw new n.bx(this.getAddress(),t.toString(),"Auction","Direct");return await this.mapListing(r)}async getActiveOffer(t,r){await this.validateListing(p.O$.from(t)),(0,f.Z)(l.isAddress(r),"Address must be a valid address");let e=await this.contractWrapper.readContract.offers(t,await (0,n.cq)(r));if(e.offeror!==d.d)return await (0,n.dh)(this.contractWrapper.getProvider(),p.O$.from(t),e)}createListing=(0,n.db)(async t=>{(0,n.dk)(t);let r=await (0,n.cq)(t.assetContractAddress),e=await (0,n.cq)(t.currencyContractAddress);await (0,n.dl)(this.contractWrapper,this.getAddress(),r,t.tokenId,await this.contractWrapper.getSignerAddress());let a=await (0,n.b9)(this.contractWrapper.getProvider(),t.buyoutPricePerToken,e),i=Math.floor(t.startTimestamp.getTime()/1e3),s=await this.contractWrapper.getProvider().getBlock("latest"),o=s.timestamp;return i<o&&(i=o),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createListing",args:[{assetContract:r,tokenId:t.tokenId,buyoutPricePerToken:a,currencyToAccept:(0,n.b8)(e),listingType:w.Direct,quantityToList:t.quantity,reservePricePerToken:a,secondsUntilEndTime:t.listingDurationInSeconds,startTime:p.O$.from(i)}],parse:t=>({id:this.contractWrapper.parseLogs("ListingAdded",t?.logs)[0].args.listingId,receipt:t})})});createListingsBatch=(0,n.db)(async t=>{let r=await Promise.all(t.map(async t=>{let r=await this.createListing.prepare(t);return r.encode()}));return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[r],parse:t=>{let r=this.contractWrapper.parseLogs("ListingAdded",t?.logs);return r.map(r=>({id:r.args.listingId,receipt:t}))}})});makeOffer=(0,n.db)(async(t,r,e,a,i)=>{if((0,n.b7)(e))throw Error("You must use the wrapped native token address when making an offer with a native token");let s=await (0,n.b9)(this.contractWrapper.getProvider(),a,e);try{await this.getListing(t)}catch(r){throw console.error("Failed to get listing, err =",r),Error(`Error getting the listing with id ${t}`)}let o=p.O$.from(r),c=p.O$.from(s).mul(o),d=await this.contractWrapper.getCallOverrides()||{};await (0,n.bc)(this.contractWrapper,c,e,d);let l=g.Bz;return i&&(l=p.O$.from(Math.floor(i.getTime()/1e3))),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"offer",args:[t,r,e,s,l],overrides:d})});acceptOffer=(0,n.db)(async(t,r)=>{await this.validateListing(p.O$.from(t));let e=await (0,n.cq)(r),a=await this.contractWrapper.readContract.offers(t,e);return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"acceptOffer",args:[t,e,a.currency,a.pricePerToken]})});buyoutListing=(0,n.db)(async(t,r,e)=>{let a=await this.validateListing(p.O$.from(t)),{valid:i,error:s}=await this.isStillValidListing(a,r);if(!i)throw Error(`Listing ${t} is no longer valid. ${s}`);let o=e||await this.contractWrapper.getSignerAddress(),c=p.O$.from(r),d=p.O$.from(a.buyoutPrice).mul(c),l=await this.contractWrapper.getCallOverrides()||{};return await (0,n.bc)(this.contractWrapper,d,a.currencyContractAddress,l),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"buy",args:[t,o,c,a.currencyContractAddress,d],overrides:l})});updateListing=(0,n.db)(async t=>n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"updateListing",args:[t.id,t.quantity,t.buyoutPrice,t.buyoutPrice,await (0,n.cq)(t.currencyContractAddress),t.startTimeInSeconds,t.secondsUntilEnd]}));cancelListing=(0,n.db)(async t=>n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"cancelDirectListing",args:[t]}));async validateListing(t){try{return await this.getListing(t)}catch(r){throw console.error(`Error getting the listing with id ${t}`),r}}async mapListing(t){return{assetContractAddress:t.assetContract,buyoutPrice:p.O$.from(t.buyoutPricePerToken),currencyContractAddress:t.currency,buyoutCurrencyValuePerToken:await (0,n.bb)(this.contractWrapper.getProvider(),t.currency,t.buyoutPricePerToken),id:t.listingId.toString(),tokenId:t.tokenId,quantity:t.quantity,startTimeInSeconds:t.startTime,asset:await (0,n.di)(t.assetContract,this.contractWrapper.getProvider(),t.tokenId,this.storage),secondsUntilEnd:t.endTime,sellerAddress:t.tokenOwner,type:w.Direct}}async isStillValidListing(t,r){let e=await (0,n.dj)(this.contractWrapper.getProvider(),this.getAddress(),t.assetContractAddress,t.tokenId,t.sellerAddress);if(!e)return{valid:!1,error:`Token '${t.tokenId}' from contract '${t.assetContractAddress}' is not approved for transfer`};let a=this.contractWrapper.getProvider(),i=new h.CH(t.assetContractAddress,s,a),d=await i.supportsInterface(n.cz),p=await i.supportsInterface(n.cA);if(d){let r;let e=new h.CH(t.assetContractAddress,o,a);try{r=await e.ownerOf(t.tokenId)}catch(t){}let i=r?.toLowerCase()===t.sellerAddress.toLowerCase();return{valid:i,error:i?void 0:`Seller is not the owner of Token '${t.tokenId}' from contract '${t.assetContractAddress} anymore'`}}if(!p)return{valid:!1,error:"Contract does not implement ERC 1155 or ERC 721."};{let e=new h.CH(t.assetContractAddress,c,a),i=await e.balanceOf(t.sellerAddress,t.tokenId),n=i.gte(r||t.quantity);return{valid:n,error:n?void 0:`Seller does not have enough balance of Token '${t.tokenId}' from contract '${t.assetContractAddress} to fulfill the listing`}}}}class y{constructor(t,r){this.contractWrapper=t,this.storage=r,this.encoder=new n.af(t)}getAddress(){return this.contractWrapper.readContract.address}async getListing(t){let r=await this.contractWrapper.readContract.listings(t);if(r.listingId.toString()!==t.toString())throw new n.bw(this.getAddress(),t.toString());if(r.listingType!==w.Auction)throw new n.bx(this.getAddress(),t.toString(),"Direct","Auction");return await this.mapListing(r)}async getWinningBid(t){await this.validateListing(p.O$.from(t));let r=await this.contractWrapper.readContract.winningBid(t);if(r.offeror!==d.d)return await (0,n.dh)(this.contractWrapper.getProvider(),p.O$.from(t),r)}async getWinner(t){let r=await this.validateListing(p.O$.from(t)),e=await this.contractWrapper.readContract.winningBid(t),a=p.O$.from(Math.floor(Date.now()/1e3)),i=p.O$.from(r.endTimeInEpochSeconds);if(a.gt(i)&&e.offeror!==d.d)return e.offeror;let n=await this.contractWrapper.readContract.queryFilter(this.contractWrapper.readContract.filters.AuctionClosed()),s=n.find(r=>r.args.listingId.eq(p.O$.from(t)));if(!s)throw Error(`Could not find auction with listingId ${t} in closed auctions`);return s.args.winningBidder}createListing=(0,n.db)(async t=>{(0,n.dk)(t);let r=await (0,n.cq)(t.assetContractAddress),e=await (0,n.cq)(t.currencyContractAddress);await (0,n.dl)(this.contractWrapper,this.getAddress(),r,t.tokenId,await this.contractWrapper.getSignerAddress());let a=await (0,n.b9)(this.contractWrapper.getProvider(),t.buyoutPricePerToken,e),i=await (0,n.b9)(this.contractWrapper.getProvider(),t.reservePricePerToken,e),s=Math.floor(t.startTimestamp.getTime()/1e3),o=await this.contractWrapper.getProvider().getBlock("latest"),c=o.timestamp;return s<c&&(s=c),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"createListing",args:[{assetContract:r,tokenId:t.tokenId,buyoutPricePerToken:a,currencyToAccept:(0,n.b8)(e),listingType:w.Auction,quantityToList:t.quantity,reservePricePerToken:i,secondsUntilEndTime:t.listingDurationInSeconds,startTime:p.O$.from(s)}],parse:t=>({id:this.contractWrapper.parseLogs("ListingAdded",t?.logs)[0].args.listingId,receipt:t})})});createListingsBatch=(0,n.db)(async t=>{let r=await Promise.all(t.map(async t=>{let r=await this.createListing.prepare(t);return r.encode()}));return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[r],parse:t=>{let r=this.contractWrapper.parseLogs("ListingAdded",t?.logs);return r.map(r=>({id:r.args.listingId,receipt:t}))}})});buyoutListing=(0,n.db)(async t=>{let r=await this.validateListing(p.O$.from(t)),e=await (0,n.ba)(this.contractWrapper.getProvider(),r.currencyContractAddress);return this.makeBid.prepare(t,u.formatUnits(r.buyoutPrice,e.decimals))});makeBid=(0,n.db)(async(t,r)=>{let e=await this.validateListing(p.O$.from(t)),a=await (0,n.b9)(this.contractWrapper.getProvider(),r,e.currencyContractAddress);if(a.eq(p.O$.from(0)))throw Error("Cannot make a bid with 0 value");let i=await this.contractWrapper.readContract.bidBufferBps(),s=await this.getWinningBid(t);if(s){let t=(0,n.dm)(s.pricePerToken,a,i);(0,f.Z)(t,"Bid price is too low based on the current winning bid and the bid buffer")}else{let t=p.O$.from(e.reservePrice);(0,f.Z)(a.gte(t),"Bid price is too low based on reserve price")}let o=p.O$.from(e.quantity),c=a.mul(o),d=await this.contractWrapper.getCallOverrides()||{};return await (0,n.bc)(this.contractWrapper,c,e.currencyContractAddress,d),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"offer",args:[t,e.quantity,e.currencyContractAddress,a,g.Bz],overrides:d})});cancelListing=(0,n.db)(async t=>{let r=await this.validateListing(p.O$.from(t)),e=p.O$.from(Math.floor(Date.now()/1e3)),a=p.O$.from(r.startTimeInEpochSeconds),i=await this.contractWrapper.readContract.winningBid(t);if(e.gt(a)&&i.offeror!==d.d)throw new n.bu(t.toString());return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"closeAuction",args:[p.O$.from(t),await this.contractWrapper.getSignerAddress()]})});closeListing=(0,n.db)(async(t,r)=>{r||(r=await this.contractWrapper.getSignerAddress());let e=await this.validateListing(p.O$.from(t));try{return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"closeAuction",args:[p.O$.from(t),r]})}catch(r){if(r.message.includes("cannot close auction before it has ended"))throw new n.bA(t.toString(),e.endTimeInEpochSeconds.toString());throw r}});executeSale=(0,n.db)(async t=>{let r=await this.validateListing(p.O$.from(t));try{let e=await this.getWinningBid(t);(0,f.Z)(e,"No winning bid found");let a=this.encoder.encode("closeAuction",[t,r.sellerAddress]),i=this.encoder.encode("closeAuction",[t,e.buyerAddress]);return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[a,i]})}catch(e){if(e.message.includes("cannot close auction before it has ended"))throw new n.bA(t.toString(),r.endTimeInEpochSeconds.toString());throw e}});updateListing=(0,n.db)(async t=>n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"updateListing",args:[t.id,t.quantity,t.reservePrice,t.buyoutPrice,t.currencyContractAddress,t.startTimeInEpochSeconds,t.endTimeInEpochSeconds]}));async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getMinimumNextBid(t){let[r,e,a]=await Promise.all([this.getBidBufferBps(),this.getWinningBid(t),await this.validateListing(p.O$.from(t))]),i=e?e.currencyValue.value:a.reservePrice,s=i.add(i.mul(r).div(1e4));return(0,n.bb)(this.contractWrapper.getProvider(),a.currencyContractAddress,s)}async validateListing(t){try{return await this.getListing(t)}catch(r){throw console.error(`Error getting the listing with id ${t}`),r}}async mapListing(t){return{assetContractAddress:t.assetContract,buyoutPrice:p.O$.from(t.buyoutPricePerToken),currencyContractAddress:t.currency,buyoutCurrencyValuePerToken:await (0,n.bb)(this.contractWrapper.getProvider(),t.currency,t.buyoutPricePerToken),id:t.listingId.toString(),tokenId:t.tokenId,quantity:t.quantity,startTimeInEpochSeconds:t.startTime,asset:await (0,n.di)(t.assetContract,this.contractWrapper.getProvider(),t.tokenId,this.storage),reservePriceCurrencyValuePerToken:await (0,n.bb)(this.contractWrapper.getProvider(),t.currency,t.reservePricePerToken),reservePrice:p.O$.from(t.reservePricePerToken),endTimeInEpochSeconds:t.endTime,sellerAddress:t.tokenOwner,type:w.Auction}}}e(13550),e(2162),e(64063),e(77191),e(54146),e(54098);class W{static contractRoles=n.dr;get chainId(){return this._chainId}constructor(t,r,e){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4?arguments[4]:void 0,s=arguments.length>5?arguments[5]:void 0,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new n.d4(t,r,i,a,e);this._chainId=s,this.abi=n.e.parse(i||[]),this.contractWrapper=o,this.storage=e,this.metadata=new n.ag(this.contractWrapper,n.ds,this.storage),this.app=new n.a$(this.contractWrapper,this.metadata,this.storage),this.roles=new n.ah(this.contractWrapper,W.contractRoles),this.encoder=new n.af(this.contractWrapper),this.estimator=new n.aP(this.contractWrapper),this.direct=new m(this.contractWrapper,this.storage),this.auction=new y(this.contractWrapper,this.storage),this.events=new n.aQ(this.contractWrapper),this.platformFees=new n.aS(this.contractWrapper),this.interceptor=new n.aR(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async getListing(t){let r=await this.contractWrapper.readContract.listings(t);if(r.assetContract===d.d)throw new n.bw(this.getAddress(),t.toString());switch(r.listingType){case w.Auction:return await this.auction.mapListing(r);case w.Direct:return await this.direct.mapListing(r);default:throw Error(`Unknown listing type: ${r.listingType}`)}}async getActiveListings(t){let r=await this.getAllListingsNoFilter(!0),e=this.applyFilter(r,t),a=p.O$.from(Math.floor(Date.now()/1e3));return e.filter(t=>t.type===w.Auction&&p.O$.from(t.endTimeInEpochSeconds).gt(a)&&p.O$.from(t.startTimeInEpochSeconds).lte(a)||t.type===w.Direct&&p.O$.from(t.quantity).gt(0))}async getAllListings(t){let r=await this.getAllListingsNoFilter(!1);return this.applyFilter(r,t)}getAll=this.getAllListings;async getTotalCount(){return await this.contractWrapper.readContract.totalListings()}async isRestrictedToListerRoleOnly(){let t=await this.contractWrapper.readContract.hasRole((0,n.bH)("lister"),d.d);return!t}async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getTimeBufferInSeconds(){return this.contractWrapper.readContract.timeBuffer()}async getOffers(t){let r=await this.events.getEvents("NewOffer",{order:"desc",filters:{listingId:t}});return await Promise.all(r.map(async r=>await (0,n.dh)(this.contractWrapper.getProvider(),p.O$.from(t),{quantityWanted:r.data.quantityWanted,pricePerToken:r.data.quantityWanted.gt(0)?r.data.totalOfferAmount.div(r.data.quantityWanted):r.data.totalOfferAmount,currency:r.data.currency,offeror:r.data.offeror})))}buyoutListing=(0,n.db)(async(t,r,e)=>{let a=await this.contractWrapper.readContract.listings(t);if(a.listingId.toString()!==t.toString())throw new n.bw(this.getAddress(),t.toString());switch(a.listingType){case w.Direct:return(0,f.Z)(void 0!==r,"quantityDesired is required when buying out a direct listing"),await this.direct.buyoutListing.prepare(t,r,e);case w.Auction:return await this.auction.buyoutListing.prepare(t);default:throw Error(`Unknown listing type: ${a.listingType}`)}});makeOffer=(0,n.db)(async(t,r,e)=>{let a=await this.contractWrapper.readContract.listings(t);if(a.listingId.toString()!==t.toString())throw new n.bw(this.getAddress(),t.toString());let i=await this.contractWrapper.getChainID();switch(a.listingType){case w.Direct:return(0,f.Z)(e,"quantity is required when making an offer on a direct listing"),await this.direct.makeOffer.prepare(t,e,(0,n.b7)(a.currency)?n.cC[i].wrapped.address:a.currency,r);case w.Auction:return await this.auction.makeBid.prepare(t,r);default:throw Error(`Unknown listing type: ${a.listingType}`)}});setBidBufferBps=(0,n.db)(async t=>{await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());let r=await this.getTimeBufferInSeconds();return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAuctionBuffers",args:[r,p.O$.from(t)]})});setTimeBufferInSeconds=(0,n.db)(async t=>{await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());let r=await this.getBidBufferBps();return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setAuctionBuffers",args:[p.O$.from(t),r]})});allowListingFromSpecificAssetOnly=(0,n.db)(async t=>{let r=[],e=await this.roles.get("asset");return e.includes(d.d)&&r.push(this.encoder.encode("revokeRole",[(0,n.bH)("asset"),d.d])),r.push(this.encoder.encode("grantRole",[(0,n.bH)("asset"),t])),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[r]})});allowListingFromAnyAsset=(0,n.db)(async()=>{let t=[],r=await this.roles.get("asset");for(let e in r)t.push(this.encoder.encode("revokeRole",[(0,n.bH)("asset"),e]));return t.push(this.encoder.encode("grantRole",[(0,n.bH)("asset"),d.d])),n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:"multicall",args:[t]})});async getAllListingsNoFilter(t){let r=await Promise.all(Array.from(Array((await this.contractWrapper.readContract.totalListings()).toNumber()).keys()).map(async r=>{let e;try{e=await this.getListing(r)}catch(t){if(t instanceof n.bw)return;console.warn(`Failed to get listing ${r}' - skipping. Try 'marketplace.getListing(${r})' to get the underlying error.`);return}if(e.type===w.Auction)return e;if(t){let{valid:t}=await this.direct.isStillValidListing(e);if(!t)return}return e}));return r.filter(t=>void 0!==t)}applyFilter(t,r){let e=[...t],a=p.O$.from(r?.start||0).toNumber(),n=p.O$.from(r?.count||i.D).toNumber();return r&&(r.seller&&(e=e.filter(t=>t.sellerAddress.toString().toLowerCase()===r?.seller?.toString().toLowerCase())),r.tokenContract&&(e=e.filter(t=>t.assetContractAddress.toString().toLowerCase()===r?.tokenContract?.toString().toLowerCase())),void 0!==r.tokenId&&(e=e.filter(t=>t.tokenId.toString()===r?.tokenId?.toString())),e=(e=e.filter((t,r)=>r>=a)).slice(0,n)),e}async prepare(t,r,e){return n.aV.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}}}}]);