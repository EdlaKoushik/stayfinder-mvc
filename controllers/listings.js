const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    // --- Search and filter logic ---
    const { search, filter } = req.query;
    let query = {};
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }
    if (filter) {
        // If using category field, filter by category
        query.category = filter;
    }
    const allListings = await Listing.find(query);
    res.render("listings/index.ejs", { allListings, search, filter });
};
module.exports.renderNewForm=(req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    res.render("listings/new.ejs");
}

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
   const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author",},}).populate("owner");
    // Debugging statement
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
    
}


module.exports.createListing=async (req, res, next) => {
    let url= req.file.path;
    let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    // category is now included in req.body.listing
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


 module.exports.renderEditForm=async (req, res) => {
         let { id } = req.params;
         const listing = await Listing.findById(id);
         if (!listing) {
             req.flash("error", "Listing you requested for does not exist!");
             return res.redirect("/listings");
         }
        //  console.log("Rendering edit page for listing:", listing); // Debugging statement



       let originalImageUrl= listing.image.url;
       originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
         res.render("listings/edit.ejs", { listing ,originalImageUrl});
     }   




     module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !=="undefined") {
        let url= req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}




    module.exports.destroyListing=async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted");
        res.redirect("/listings");
    }






