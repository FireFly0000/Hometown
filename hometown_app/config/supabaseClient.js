import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://zldofslsogdfhztknztq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZG9mc2xzb2dkZmh6dGtuenRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMzI4NTIsImV4cCI6MTk4NTYwODg1Mn0.pz95-aV40QLGjPawBoGRs3oqrLuJ8woN5jELs-GaFxU'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase