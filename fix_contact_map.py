import re

with open('src/pages/Contact.tsx', 'r') as f:
    content = f.read()

# Add a "Get Directions" button below the map iframe
old_map = """                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location of Kolte Patil Life Republic"
                                ></iframe>
                            </div>
                        </div>"""

new_map = """                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location of Kolte Patil Life Republic"
                                ></iframe>
                            </div>
                            <div className="mt-4">
                                <a 
                                    href="https://www.google.com/maps/dir//Life+Republic+Sales+Office+Or+Main+Office,+Survey+No.+74+Hinjawadi+-+Marunji,+Hinjawadi+-+Kasarsai+Rd,+Taluka,+Mulshi,+Maharashtra+411033/@18.6459725,73.7360171,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2ba5053b55b4b:0x14d3205e23f3f5f7!2m2!1d73.7093735!2d18.6182576?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white py-4 rounded-xl font-bold transition-colors shadow-lg"
                                >
                                    <span className="material-symbol">directions</span>
                                    Get Directions to Sales Office
                                </a>
                            </div>
                        </div>"""

content = content.replace(old_map, new_map)

with open('src/pages/Contact.tsx', 'w') as f:
    f.write(content)
